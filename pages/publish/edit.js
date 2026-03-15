const houseService = require("../../services/house.service");
const mapService = require("../../services/map.service");
const authUtils = require("../../utils/auth");
const { validateHouseForm, isPhone } = require("../../utils/validate");
const { logger } = require("../../utils/logger");
const { ROUTES, switchTab } = require("../../config/routes");

const PENDING_PUBLISH_CONTEXT_KEY = "pendingPublishContext";
const PROFILE_ENTRY_HIGHLIGHT_KEY = "profileEntryHighlight";
const PAYMENT_OPTIONS = ["月付", "季付", "半年付", "年付"];
const MIN_RENT_PERIOD_OPTIONS = [1, 3, 6, 12];
const ORIENTATION_OPTIONS = ["东", "南", "西", "北", "东南", "东北", "西南", "西北"];
const FALLBACK_REGION_OPTIONS = [{ label: "全部区域", value: "" }];
const DEFAULT_FACILITIES = {
  elevator: false,
  parking: false,
  wifi: false,
  airConditioner: false,
  washingMachine: false,
  refrigerator: false,
  waterHeater: false,
  bed: false,
  wardrobe: false,
  balcony: false,
  security: false,
  gym: false,
  swimmingPool: false
};
const FACILITY_OPTIONS = [
  { key: "elevator", label: "电梯" },
  { key: "parking", label: "停车位" },
  { key: "wifi", label: "宽带" },
  { key: "airConditioner", label: "空调" },
  { key: "washingMachine", label: "洗衣机" },
  { key: "refrigerator", label: "冰箱" },
  { key: "waterHeater", label: "热水器" },
  { key: "bed", label: "床" },
  { key: "wardrobe", label: "衣柜" },
  { key: "balcony", label: "阳台" },
  { key: "security", label: "门禁" },
  { key: "gym", label: "健身房" },
  { key: "swimmingPool", label: "游泳池" }
];

function cloneFacilities(facilities = {}) {
  if (!facilities || Object.prototype.toString.call(facilities) !== "[object Object]") {
    return { ...DEFAULT_FACILITIES };
  }

  return {
    ...DEFAULT_FACILITIES,
    ...facilities
  };
}

function getPendingPublishContext() {
  const app = getApp();
  return app.globalData[PENDING_PUBLISH_CONTEXT_KEY] || null;
}

function consumePendingPublishContext() {
  const context = getPendingPublishContext();
  const app = getApp();
  app.globalData[PENDING_PUBLISH_CONTEXT_KEY] = null;
  return context;
}

function consumeProfileEntryHighlight() {
  const app = getApp();
  const highlightKey = String(app.globalData[PROFILE_ENTRY_HIGHLIGHT_KEY] || "");
  app.globalData[PROFILE_ENTRY_HIGHLIGHT_KEY] = "";
  return highlightKey;
}

function createInitialForm() {
  return {
    title: "",
    price: "",
    type: "",
    area: "",
    address: "",
    description: "",
    paymentMethod: PAYMENT_OPTIONS[0],
    minRentPeriod: MIN_RENT_PERIOD_OPTIONS[0],
    floor: "",
    orientation: "",
    region: "",
    latitude: 0,
    longitude: 0,
    facilities: cloneFacilities(),
    contactName: "",
    contactPhone: ""
  };
}

function buildRegionOptions(regions = []) {
  return FALLBACK_REGION_OPTIONS.concat(
    (Array.isArray(regions) ? regions : []).map((item) => ({
      label: item.name || "",
      value: item.name || ""
    }))
  );
}

function getPickerIndex(options = [], value) {
  const index = options.findIndex((item) => item === value);
  return index >= 0 ? index : 0;
}

function getRegionIndex(regionOptions = [], region = "") {
  if (!region) {
    return 0;
  }

  const index = regionOptions.findIndex((item) => item.value === region);
  return index >= 0 ? index : 0;
}

function matchRegionByLocation(regionOptions = [], location = {}, formattedAddress = "") {
  const latitude = Number(location.lat || location.latitude || 0);
  const longitude = Number(location.lng || location.longitude || 0);
  const normalizedAddress = String(formattedAddress || "").trim();

  if (!latitude || !longitude || !normalizedAddress) {
    return "";
  }

  const matched = (Array.isArray(regionOptions) ? regionOptions : [])
    .filter((item) => item && item.value && item.value !== "全市")
    .sort((left, right) => String(right.value || "").length - String(left.value || "").length)
    .find((item) => normalizedAddress.includes(String(item.value || "").trim()));

  return matched ? matched.value : "";
}

Page({
  data: {
    isEdit: false,
    houseId: "",
    submitting: false,
    loadingDetail: false,
    errorText: "",
    formData: createInitialForm(),
    imageList: [],
    paymentOptions: PAYMENT_OPTIONS,
    minRentPeriodOptions: MIN_RENT_PERIOD_OPTIONS,
    orientationOptions: ORIENTATION_OPTIONS,
    regionOptions: FALLBACK_REGION_OPTIONS,
    facilityOptions: FACILITY_OPTIONS,
    selectedPaymentIndex: 0,
    selectedMinRentPeriodIndex: 0,
    selectedOrientationIndex: 0,
    selectedRegionIndex: 0,
    titleHighlight: false
  },

  async onLoad(options) {
    logger.info("page_load", { page: "publish/edit", query: options || {} });
    this.detailRequestId = 0;
    const houseId = options && options.houseId ? String(options.houseId) : "";
    const isEdit = Boolean(houseId);
    this.setData({ houseId, isEdit });

    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("publish_edit_onload_end", { blocked: "not_login" });
      return;
    }

    if (!authUtils.canPublishHouse()) {
      wx.showToast({ title: "仅房东可发布房源", icon: "none" });
      logger.info("publish_edit_onload_end", { blocked: "role_denied" });
      return;
    }

    await this.loadRegionOptions();

    if (isEdit) {
      await this.loadHouseDetail(houseId);
    }

    this.hasInitialized = true;

    if (!isEdit) {
      await this.applyPendingPublishContext();
    }

    logger.info("publish_edit_onload_end", { isEdit, hasPendingContext: Boolean(getPendingPublishContext()) });
  },

  async onShow() {
    logger.info("publish_edit_onshow_start", {});
    if (!this.hasInitialized) {
      logger.info("publish_edit_onshow_end", { blocked: "not_initialized" });
      return;
    }

    if (!authUtils.isLoggedIn() || !authUtils.canPublishHouse()) {
      logger.info("publish_edit_onshow_end", { blocked: "permission_denied" });
      return;
    }

    await this.applyPendingPublishContext();
    this.applyProfileEntryHighlight();
    logger.info("publish_edit_onshow_end", {});
  },

  onUnload() {
    this.clearTitleHighlightTimer();
  },

  resetPublishState() {
    logger.info("publish_reset_state_start", {});
    const formData = createInitialForm();
    this.clearTitleHighlightTimer();
    this.setData({
      isEdit: false,
      houseId: "",
      submitting: false,
      loadingDetail: false,
      errorText: "",
      formData,
      imageList: [],
      selectedPaymentIndex: getPickerIndex(PAYMENT_OPTIONS, formData.paymentMethod),
      selectedMinRentPeriodIndex: getPickerIndex(MIN_RENT_PERIOD_OPTIONS, formData.minRentPeriod),
      selectedOrientationIndex: getPickerIndex(ORIENTATION_OPTIONS, formData.orientation),
      selectedRegionIndex: getRegionIndex(this.data.regionOptions, formData.region),
      titleHighlight: false
    });
    logger.info("publish_reset_state_end", {});
  },

  applyProfileEntryHighlight() {
    const highlightKey = consumeProfileEntryHighlight();
    logger.info("publish_title_highlight_start", { highlightKey });
    if (highlightKey !== "publish") {
      logger.info("publish_title_highlight_end", { blocked: "not_matched" });
      return;
    }

    this.clearTitleHighlightTimer();
    this.setData({ titleHighlight: true });
    wx.nextTick(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 260
      });
    });
    this.titleHighlightTimer = setTimeout(() => {
      this.setData({ titleHighlight: false });
      this.titleHighlightTimer = null;
    }, 1800);
    logger.info("publish_title_highlight_end", { matched: true });
  },

  clearTitleHighlightTimer() {
    if (this.titleHighlightTimer) {
      clearTimeout(this.titleHighlightTimer);
      this.titleHighlightTimer = null;
    }
  },

  async applyPendingPublishContext() {
    const context = consumePendingPublishContext();
    logger.info("publish_apply_context_start", { context: context || null });

    if (!context) {
      logger.info("publish_apply_context_end", { blocked: "empty_context" });
      return;
    }

    if (context.mode === "edit" && context.houseId) {
      const houseId = String(context.houseId);
      this.setData({
        isEdit: true,
        houseId,
        errorText: ""
      });
      await this.loadHouseDetail(houseId, { resetBeforeLoad: true });
      logger.info("publish_apply_context_end", { mode: "edit", houseId });
      return;
    }

    this.resetPublishState();
    logger.info("publish_apply_context_end", { mode: "create" });
  },

  async loadRegionOptions() {
    logger.info("publish_load_regions_start", {});
    const currentRegion = this.data.formData.region || "";

    try {
      logger.info("api_call", { func: "house.getRegions", params: {} });
      const regions = await houseService.getRegions();
      const regionOptions = buildRegionOptions(regions);
      this.setData({
        regionOptions,
        selectedRegionIndex: getRegionIndex(regionOptions, currentRegion)
      });
      logger.info("api_resp", {
        func: "house.getRegions",
        code: 0,
        count: Array.isArray(regions) ? regions.length : 0
      });
    } catch (error) {
      this.setData({
        regionOptions: FALLBACK_REGION_OPTIONS,
        selectedRegionIndex: 0
      });
      logger.warn("publish_load_regions_fallback", {
        err: error.message || "区域加载失败"
      });
    } finally {
      logger.info("publish_load_regions_end", {
        count: this.data.regionOptions.length
      });
    }
  },

  buildEmptyEditState(nextHouseId) {
    const formData = createInitialForm();
    return {
      isEdit: true,
      houseId: String(nextHouseId || ""),
      errorText: "",
      formData,
      imageList: [],
      selectedPaymentIndex: getPickerIndex(PAYMENT_OPTIONS, formData.paymentMethod),
      selectedMinRentPeriodIndex: getPickerIndex(MIN_RENT_PERIOD_OPTIONS, formData.minRentPeriod),
      selectedOrientationIndex: getPickerIndex(ORIENTATION_OPTIONS, formData.orientation),
      selectedRegionIndex: getRegionIndex(this.data.regionOptions, formData.region)
    };
  },

  async loadHouseDetail(houseId, options = {}) {
    logger.info("publish_load_detail_start", { houseId });
    const {
      resetBeforeLoad = false
    } = options;
    const normalizedHouseId = String(houseId || "").trim();
    const requestId = (this.detailRequestId || 0) + 1;
    this.detailRequestId = requestId;

    if (resetBeforeLoad) {
      this.setData({
        ...this.buildEmptyEditState(normalizedHouseId),
        loadingDetail: true
      });
    } else {
      this.setData({
        loadingDetail: true,
        errorText: ""
      });
    }

    try {
      logger.info("api_call", { func: "house.getDetail", params: { houseId: normalizedHouseId } });
      const detail = await houseService.getHouseDetail(normalizedHouseId);
      logger.info("api_resp", { func: "house.getDetail", code: 0 });

      if (requestId !== this.detailRequestId) {
        logger.warn("publish_load_detail_stale", { houseId: normalizedHouseId, requestId });
        return;
      }

      const formData = {
        ...createInitialForm(),
        title: detail.title || "",
        price: detail.price ? String(detail.price) : "",
        type: detail.type || "",
        area: detail.area ? String(detail.area) : "",
        address: detail.address || "",
        description: detail.description || "",
        paymentMethod: detail.paymentMethod || PAYMENT_OPTIONS[0],
        minRentPeriod: Number(detail.minRentPeriod) > 0
          ? Number(detail.minRentPeriod)
          : MIN_RENT_PERIOD_OPTIONS[0],
        floor: detail.floor || "",
        orientation: detail.orientation || "",
        region: detail.region || "",
        latitude: Number(detail.latitude || 0),
        longitude: Number(detail.longitude || 0),
        facilities: cloneFacilities(detail.facilities),
        contactName: detail.contactName || "",
        contactPhone: detail.contactPhone || ""
      };

      this.setData({
        isEdit: true,
        houseId: normalizedHouseId,
        errorText: "",
        formData,
        imageList: (detail.images || []).map((url) => ({ url })),
        selectedPaymentIndex: getPickerIndex(PAYMENT_OPTIONS, formData.paymentMethod),
        selectedMinRentPeriodIndex: getPickerIndex(MIN_RENT_PERIOD_OPTIONS, formData.minRentPeriod),
        selectedOrientationIndex: getPickerIndex(ORIENTATION_OPTIONS, formData.orientation),
        selectedRegionIndex: getRegionIndex(this.data.regionOptions, formData.region)
      });
    } catch (error) {
      if (requestId !== this.detailRequestId) {
        logger.warn("publish_load_detail_error_stale", {
          houseId: normalizedHouseId,
          requestId,
          err: error.message
        });
        return;
      }

      logger.error("api_error", { func: "house.getDetail", err: error.message });
      this.setData({
        errorText: error.message || "房源详情加载失败"
      });
      wx.showToast({ title: error.message || "加载失败", icon: "none" });
    } finally {
      if (requestId === this.detailRequestId) {
        this.setData({ loadingDetail: false });
      }
      logger.info("publish_load_detail_end", {});
    }
  },

  onInputChange(event) {
    logger.debug("publish_input_change_start", {});
    const field = event.currentTarget.dataset.field;
    const value = event.detail.value || "";
    if (!field) {
      logger.warn("publish_input_change_missing_field", {});
      return;
    }
    this.setData({
      [`formData.${field}`]: value
    });
    logger.debug("publish_input_change_end", { field });
  },

  onPaymentChange(event) {
    logger.info("publish_payment_change_start", { value: event.detail.value });
    const selectedPaymentIndex = Number(event.detail.value) || 0;
    const paymentMethod = PAYMENT_OPTIONS[selectedPaymentIndex] || PAYMENT_OPTIONS[0];
    this.setData({
      selectedPaymentIndex,
      "formData.paymentMethod": paymentMethod
    });
    logger.info("publish_payment_change_end", { paymentMethod });
  },

  onMinRentPeriodChange(event) {
    logger.info("publish_rent_period_change_start", { value: event.detail.value });
    const selectedMinRentPeriodIndex = Number(event.detail.value) || 0;
    const minRentPeriod = MIN_RENT_PERIOD_OPTIONS[selectedMinRentPeriodIndex] || MIN_RENT_PERIOD_OPTIONS[0];
    this.setData({
      selectedMinRentPeriodIndex,
      "formData.minRentPeriod": minRentPeriod
    });
    logger.info("publish_rent_period_change_end", { minRentPeriod });
  },

  onOrientationChange(event) {
    logger.info("publish_orientation_change_start", { value: event.detail.value });
    const selectedOrientationIndex = Number(event.detail.value) || 0;
    const orientation = ORIENTATION_OPTIONS[selectedOrientationIndex] || "";
    this.setData({
      selectedOrientationIndex,
      "formData.orientation": orientation
    });
    logger.info("publish_orientation_change_end", { orientation });
  },

  onRegionChange(event) {
    logger.info("publish_region_change_start", { value: event.detail.value });
    const selectedRegionIndex = Number(event.detail.value) || 0;
    const region = this.data.regionOptions[selectedRegionIndex]?.value || "";
    this.setData({
      selectedRegionIndex,
      "formData.region": region
    });
    logger.info("publish_region_change_end", { region });
  },

  onFacilityToggle(event) {
    logger.info("publish_facility_toggle_start", { data: event.currentTarget.dataset || {} });
    const key = event.currentTarget.dataset.key;

    if (!Object.prototype.hasOwnProperty.call(DEFAULT_FACILITIES, key)) {
      logger.warn("publish_facility_toggle_invalid_key", { key });
      return;
    }

    const currentValue = Boolean(this.data.formData.facilities?.[key]);
    this.setData({
      [`formData.facilities.${key}`]: !currentValue
    });
    logger.info("publish_facility_toggle_end", { key, value: !currentValue });
  },

  async onChooseLocation() {
    logger.info("publish_choose_location_start", {});
    try {
      const result = await wx.chooseLocation();
      const address = String(result.address || result.name || "").trim();
      const latitude = Number(result.latitude || 0);
      const longitude = Number(result.longitude || 0);

      this.setData({
        "formData.address": address || this.data.formData.address,
        "formData.latitude": latitude,
        "formData.longitude": longitude
      });

      try {
        const geocodeResult = await mapService.geocodeAddress(address);
        const formattedAddress = String(geocodeResult?.formattedAddress || "").trim();
        const nextAddress = formattedAddress || address || this.data.formData.address;
        const nextData = {
          "formData.address": nextAddress
        };

        if (!this.data.formData.region) {
          const matchedRegion = matchRegionByLocation(
            this.data.regionOptions,
            geocodeResult?.location || {
              latitude: geocodeResult?.latitude,
              longitude: geocodeResult?.longitude
            },
            nextAddress
          );

          if (matchedRegion) {
            nextData["formData.region"] = matchedRegion;
            nextData.selectedRegionIndex = getRegionIndex(this.data.regionOptions, matchedRegion);
          }
        }

        this.setData(nextData);
      } catch (error) {
        logger.warn("publish_choose_location_geocode_failed", {
          err: error.message || "地址解析失败"
        });
      }

      logger.info("publish_choose_location_end", {
        address,
        latitude,
        longitude
      });
    } catch (error) {
      const errMsg = error?.errMsg || "";
      if (errMsg.includes("cancel")) {
        logger.warn("publish_choose_location_cancel", {});
        return;
      }
      logger.error("publish_choose_location_failed", { error: error.message });
      wx.showToast({ title: "定位选择失败", icon: "none" });
    }
  },

  async onChooseImages() {
    logger.info("publish_choose_images_start", {});
    try {
      const currentCount = this.data.imageList.length;
      const maxCount = 9;
      if (currentCount >= maxCount) {
        wx.showToast({ title: "最多上传9张图片", icon: "none" });
        logger.info("publish_choose_images_end", { blocked: "reach_limit" });
        return;
      }

      const res = await wx.chooseMedia({
        count: maxCount - currentCount,
        mediaType: ["image"],
        sourceType: ["album", "camera"]
      });

      const selected = (res.tempFiles || []).map((item) => ({
        url: item.tempFilePath,
        tempFilePath: item.tempFilePath
      }));

      this.setData({
        imageList: this.data.imageList.concat(selected)
      });
    } catch (error) {
      logger.error("publish_choose_images_failed", { error: error.message });
    } finally {
      logger.info("publish_choose_images_end", { count: this.data.imageList.length });
    }
  },

  onRemoveImage(event) {
    logger.info("publish_remove_image_start", { data: event.currentTarget.dataset || {} });
    const index = Number(event.currentTarget.dataset.index);
    if (Number.isNaN(index)) {
      logger.warn("publish_remove_image_invalid_index", { index });
      return;
    }

    const nextList = this.data.imageList.slice();
    nextList.splice(index, 1);
    this.setData({ imageList: nextList });
    logger.info("publish_remove_image_end", { count: nextList.length });
  },

  buildSubmitPayload(images) {
    logger.debug("publish_build_payload_start", {});
    const form = this.data.formData;
    const payload = {
      title: form.title.trim(),
      price: Number(form.price) || 0,
      type: form.type.trim(),
      area: Number(form.area) || 0,
      address: form.address.trim(),
      description: form.description.trim(),
      paymentMethod: String(form.paymentMethod || PAYMENT_OPTIONS[0]).trim() || PAYMENT_OPTIONS[0],
      minRentPeriod: Number(form.minRentPeriod) || MIN_RENT_PERIOD_OPTIONS[0],
      floor: String(form.floor || "").trim(),
      orientation: String(form.orientation || "").trim(),
      region: String(form.region || "").trim(),
      latitude: Number(form.latitude) || 0,
      longitude: Number(form.longitude) || 0,
      facilities: cloneFacilities(form.facilities),
      contactName: form.contactName.trim(),
      contactPhone: form.contactPhone.trim(),
      images
    };
    logger.debug("publish_build_payload_end", { hasImages: images.length > 0 });
    return payload;
  },

  async uploadImages() {
    logger.info("publish_upload_images_start", { count: this.data.imageList.length });
    const userInfo = authUtils.getLoginUser() || {};
    const userId = userInfo.userId || "anonymous";
    const uploaded = [];

    for (let i = 0; i < this.data.imageList.length; i += 1) {
      const item = this.data.imageList[i];
      if (!item.tempFilePath) {
        uploaded.push(item.url);
        continue;
      }

      const sourcePath = item.tempFilePath;
      const extension = sourcePath.includes(".")
        ? sourcePath.split(".").pop().split("?")[0]
        : "jpg";
      const cloudPath = `houses/${userId}/${Date.now()}_${i}.${extension}`;

      try {
        // 图片按顺序上传，便于稳定生成云存储路径并在失败时及时停止。
        // eslint-disable-next-line no-await-in-loop
        const fileID = await houseService.uploadHouseImage(sourcePath, cloudPath);
        uploaded.push(fileID);
      } catch (error) {
        logger.error("publish_upload_single_failed", {
          index: i,
          error: error.message
        });
        throw new Error("图片上传失败，请重试");
      }
    }

    logger.info("publish_upload_images_end", { count: uploaded.length });
    return uploaded;
  },

  async onSubmitTap() {
    logger.info("publish_submit_start", { isEdit: this.data.isEdit });
    if (this.data.submitting) {
      logger.info("publish_submit_end", { blocked: "submitting" });
      return;
    }

    const baseCheck = validateHouseForm(this.data.formData);
    if (!baseCheck.valid) {
      wx.showToast({ title: baseCheck.message, icon: "none" });
      logger.info("publish_submit_end", { blocked: "invalid_house_form" });
      return;
    }

    if (!isPhone(this.data.formData.contactPhone)) {
      wx.showToast({ title: "联系电话格式错误", icon: "none" });
      logger.info("publish_submit_end", { blocked: "invalid_phone" });
      return;
    }

    if (!this.data.imageList.length) {
      wx.showToast({ title: "请至少上传1张图片", icon: "none" });
      logger.info("publish_submit_end", { blocked: "no_images" });
      return;
    }

    this.setData({ submitting: true });

    try {
      const images = await this.uploadImages();
      const payload = this.buildSubmitPayload(images);

      if (this.data.isEdit) {
        logger.info("api_call", {
          func: "house.update",
          params: { houseId: this.data.houseId }
        });
        await houseService.updateHouse(this.data.houseId, payload);
      } else {
        logger.info("api_call", { func: "house.create", params: { hasPayload: true } });
        await houseService.createHouse(payload);
      }

      logger.info("api_resp", { func: this.data.isEdit ? "house.update" : "house.create", code: 0 });
      wx.showToast({ title: this.data.isEdit ? "修改成功" : "发布成功", icon: "success" });
      setTimeout(() => {
        switchTab(ROUTES.PUBLISH);
      }, 600);
    } catch (error) {
      logger.error("api_error", {
        func: this.data.isEdit ? "house.update" : "house.create",
        err: error.message
      });
      wx.showToast({ title: error.message || "提交失败", icon: "none" });
    } finally {
      this.setData({ submitting: false });
      logger.info("publish_submit_end", {});
    }
  }
});
