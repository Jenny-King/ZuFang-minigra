const houseService = require("../../../services/house.service");
const favoriteService = require("../../../services/favorite.service");
const historyService = require("../../../services/history.service");
const chatService = require("../../../services/chat.service");
const mapService = require("../../../services/map.service");
const authUtils = require("../../../utils/auth");
const { formatPrice, formatDate, fallbackText } = require("../../../utils/format");
const { ROUTES, navigateTo } = require("../../../config/routes");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const FACILITY_LABEL_MAP = {
  elevator: "电梯",
  parking: "停车位",
  wifi: "宽带",
  airConditioner: "空调",
  washingMachine: "洗衣机",
  refrigerator: "冰箱",
  waterHeater: "热水器",
  bed: "床",
  sofa: "沙发",
  tv: "电视",
  wardrobe: "衣柜",
  balcony: "阳台",
  security: "门禁",
  gym: "健身房",
  swimmingPool: "游泳池",
  hotWater: "热水器"
};

function formatFloorValue(floor) {
  const displayFloor = fallbackText(floor, "--");
  if (displayFloor === "--") {
    return displayFloor;
  }
  return /层$/.test(displayFloor) ? displayFloor : `${displayFloor}层`;
}

function formatNearbyDistance(distance) {
  const numericDistance = Number(distance);
  if (!Number.isFinite(numericDistance) || numericDistance < 0) {
    return "--";
  }
  if (numericDistance >= 1000) {
    return `${(numericDistance / 1000).toFixed(1)}km`;
  }
  return `${Math.round(numericDistance)}m`;
}

Page({
  data: {
    houseId: "",
    loading: false,
    favoriteLoading: false,
    houseDetail: null,
    nearbyList: [],
    mapMarkers: [],
    isFavorite: false,
    swiperCurrent: 0,
    errorText: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "house/detail", query: options || {} });
    const houseId = options && options.houseId ? String(options.houseId) : "";
    if (!houseId) {
      this.setData({ errorText: "缺少房源 ID" });
      logger.debug("house_detail_onload_end", { blocked: "missing_house_id" });
      return;
    }
    this.setData({ houseId });
    await this.loadPageData();
    logger.debug("house_detail_onload_end", { houseId });
  },

  async onPullDownRefresh() {
    logger.debug("house_detail_pulldown_start", {});
    try {
      await this.loadPageData();
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("house_detail_pulldown_end", {});
    }
  },

  async loadPageData() {
    logger.debug("house_detail_load_start", {});
    await Promise.allSettled([
      this.loadDetail(),
      this.loadFavoriteStatus(),
      this.addViewHistory()
    ]);
    logger.debug("house_detail_load_end", {});
  },

  normalizeDetail(detail) {
    logger.debug("house_detail_normalize_start", {});
    if (!detail) {
      logger.debug("house_detail_normalize_end", { hasDetail: false });
      return null;
    }
    const normalized = {
      ...detail,
      displayTitle: fallbackText(detail.title, "未命名房源"),
      displayPrice: formatPrice(Number(detail.price) || 0),
      displayType: fallbackText(detail.layoutText || detail.type, "未知户型"),
      displayAddress: fallbackText(detail.address, "地址待完善"),
      displayArea: detail.area ? `${detail.area}㎡` : "--",
      displayFloor: formatFloorValue(detail.floor),
      displayDescription: fallbackText(detail.description, "暂无描述"),
      displayCreateTime: detail.createTime ? formatDate(detail.createTime) : "",
      displayImages: Array.isArray(detail.images) && detail.images.length
        ? detail.images
        : ["/assets/images/house-placeholder.png"],
      displayContactName: fallbackText(detail.contactName, "房东"),
      displayContactPhone: fallbackText(detail.contactPhone, "未提供"),
      displayFacilities: Object.keys(detail.facilities || {})
        .filter((key) => detail.facilities[key])
        .map((key) => FACILITY_LABEL_MAP[key] || key)
    };
    logger.debug("house_detail_normalize_end", { hasDetail: true });
    return normalized;
  },

  async loadDetail() {
    logger.debug("house_detail_fetch_start", { houseId: this.data.houseId });
    this.setData({ loading: true, errorText: "" });
    try {
      logger.debug("api_call", {
        func: "house.getDetail",
        params: { houseId: this.data.houseId }
      });
      const detail = await houseService.getHouseDetail(this.data.houseId);
      logger.debug("api_resp", { func: "house.getDetail", code: 0 });
      const houseDetail = this.normalizeDetail(detail);
      this.setData({
        houseDetail,
        swiperCurrent: 0
      });
      await this.loadNearbyData(houseDetail);
    } catch (error) {
      const message = error.message || "房源详情加载失败";
      this.setData({
        errorText: message,
        nearbyList: [],
        mapMarkers: []
      });
      logger.error("api_error", { func: "house.getDetail", err: message });
    } finally {
      this.setData({ loading: false });
      logger.debug("house_detail_fetch_end", {});
    }
  },

  async loadNearbyData(houseDetail) {
    const latitude = Number(houseDetail?.latitude || 0);
    const longitude = Number(houseDetail?.longitude || 0);

    if (!latitude) {
      this.setData({
        nearbyList: [],
        mapMarkers: []
      });
      return;
    }

    const pinColor = "#07c160";
    const svgMarkup = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'><path d='M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z' fill='${pinColor}'/><circle cx='12' cy='9' r='3.5' fill='#ffffff'/></svg>`;
    const dynamicIconPath = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;

    const mapMarkers = [{
      id: 0,
      latitude,
      longitude,
      title: houseDetail.displayTitle,
      iconPath: dynamicIconPath,
      width: 36,
      height: 36,
      anchor: { x: 0.5, y: 1 }
    }];

    this.setData({
      nearbyList: [],
      mapMarkers
    });

    try {
      const nearbyList = await mapService.searchNearby(latitude, longitude);
      this.setData({
        nearbyList: Array.isArray(nearbyList)
          ? nearbyList.map((item) => ({
            ...item,
            displayDistance: formatNearbyDistance(item.distance)
          }))
          : [],
        mapMarkers
      });
    } catch (error) {
      logger.warn("house_detail_nearby_failed", {
        err: error.message || "周边设施加载失败"
      });
      this.setData({
        nearbyList: [],
        mapMarkers
      });
    }
  },

  async loadFavoriteStatus() {
    logger.debug("house_detail_fav_status_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.debug("house_detail_fav_status_end", { skipped: "not_login" });
      return;
    }
    try {
      logger.debug("api_call", {
        func: "favorite.check",
        params: { houseId: this.data.houseId }
      });
      const result = await favoriteService.checkFavorite(this.data.houseId);
      logger.debug("api_resp", { func: "favorite.check", code: 0 });
      this.setData({ isFavorite: Boolean(result && result.isFavorite) });
    } catch (error) {
      logger.error("api_error", { func: "favorite.check", err: error.message });
    } finally {
      logger.debug("house_detail_fav_status_end", {});
    }
  },

  async addViewHistory() {
    logger.debug("house_detail_add_history_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.debug("house_detail_add_history_end", { skipped: "not_login" });
      return;
    }
    try {
      logger.debug("api_call", {
        func: "history.add",
        params: { houseId: this.data.houseId }
      });
      await historyService.addHistory(this.data.houseId);
      logger.debug("api_resp", { func: "history.add", code: 0 });
    } catch (error) {
      logger.error("api_error", { func: "history.add", err: error.message });
    } finally {
      logger.debug("house_detail_add_history_end", {});
    }
  },

  onPreviewImage(event) {
    logger.debug("house_detail_preview_start", { data: event.currentTarget.dataset || {} });
    const current = event.currentTarget.dataset.url;
    const urls = (this.data.houseDetail && this.data.houseDetail.displayImages) || [];
    if (!current || !urls.length) {
      logger.debug("house_detail_preview_end", { blocked: "empty_images" });
      return;
    }
    wx.previewImage({ current, urls });
    logger.debug("house_detail_preview_end", {});
  },

  onSwiperChange(event) {
    this.setData({
      swiperCurrent: Number(event.detail.current || 0)
    });
  },

  onOpenLocationTap() {
    const houseDetail = this.data.houseDetail;
    const latitude = Number(houseDetail?.latitude || 0);
    const longitude = Number(houseDetail?.longitude || 0);

    logger.debug("house_detail_open_location_start", {
      latitude,
      longitude
    });

    if (!latitude || !longitude) {
      toast.info("暂无可查看的地图位置");
      logger.debug("house_detail_open_location_end", { blocked: "missing_location" });
      return;
    }

    wx.openLocation({
      latitude,
      longitude,
      scale: 18,
      name: houseDetail?.displayTitle || "房源位置",
      address: houseDetail?.displayAddress || ""
    });

    logger.debug("house_detail_open_location_end", {});
  },

  async onToggleFavoriteTap() {
    logger.debug("house_detail_toggle_fav_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("house_detail_toggle_fav_end", { blocked: "not_login" });
      return;
    }
    if (this.data.favoriteLoading) {
      logger.debug("house_detail_toggle_fav_end", { blocked: "loading" });
      return;
    }

    this.setData({ favoriteLoading: true });
    try {
      logger.debug("api_call", {
        func: "favorite.toggle",
        params: { houseId: this.data.houseId }
      });
      const result = await favoriteService.toggleFavorite(this.data.houseId);
      logger.debug("api_resp", { func: "favorite.toggle", code: 0 });
      const isFavorite = typeof result?.isFavorite === "boolean"
        ? result.isFavorite
        : !this.data.isFavorite;
      this.setData({ isFavorite });
      await toast.info(isFavorite ? "已收藏" : "已取消收藏");
    } catch (error) {
      logger.error("api_error", { func: "favorite.toggle", err: error.message });
      await toast.error(error.message || "操作失败");
    } finally {
      this.setData({ favoriteLoading: false });
      logger.debug("house_detail_toggle_fav_end", {});
    }
  },

  async onContactTap() {
    logger.debug("house_detail_contact_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("house_detail_contact_end", { blocked: "not_login" });
      return;
    }
    const detail = this.data.houseDetail;
    if (!detail) {
      logger.debug("house_detail_contact_end", { blocked: "no_detail" });
      return;
    }
    const targetUserId = detail.landlordUserId || "";
    if (!targetUserId) {
      await toast.error("房东信息缺失");
      logger.debug("house_detail_contact_end", { blocked: "missing_landlord" });
      return;
    }

    try {
      logger.debug("api_call", {
        func: "chat.createConversation",
        params: { targetUserId, houseId: this.data.houseId }
      });
      const result = await chatService.createOrGetConversation(targetUserId, this.data.houseId);
      logger.debug("api_resp", { func: "chat.createConversation", code: 0 });
      const conversationId = result && result.conversationId ? result.conversationId : "";
      navigateTo(ROUTES.CHAT_DETAIL, {
        conversationId,
        targetUserId,
        houseId: this.data.houseId
      });
    } catch (error) {
      logger.error("api_error", { func: "chat.createConversation", err: error.message });
      await toast.error(error.message || "无法发起会话");
    } finally {
      logger.debug("house_detail_contact_end", {});
    }
  },

  onBookingTap() {
    logger.debug("house_detail_booking_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("house_detail_booking_end", { blocked: "not_login" });
      return;
    }
    const detail = this.data.houseDetail;
    if (!detail) {
      logger.debug("house_detail_booking_end", { blocked: "no_detail" });
      return;
    }
    navigateTo(ROUTES.BOOKING_FORM, {
      houseId: this.data.houseId,
      landlordUserId: detail.landlordUserId || ""
    });
    logger.debug("house_detail_booking_end", {});
  }
});
