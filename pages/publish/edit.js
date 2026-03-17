const houseService = require("../../services/house.service");
const mapService = require("../../services/map.service");
const { HOUSE_TYPE } = require("../../config/constants");
const authUtils = require("../../utils/auth");
const { validateHouseForm, isPhone } = require("../../utils/validate");
const { logger } = require("../../utils/logger");
const { ROUTES, switchTab } = require("../../config/routes");
const toast = require("../../utils/toast");

const PENDING_PUBLISH_CONTEXT_KEY = "pendingPublishContext";
const PROFILE_ENTRY_HIGHLIGHT_KEY = "profileEntryHighlight";
const DEFAULT_MIN_RENT_PERIOD = "1";
const FALLBACK_REGION_OPTIONS = [{ label: "全部区域", value: "" }];
const STEP_LIST = [
  { key: "base", label: "基础信息" },
  { key: "location", label: "位置描述" },
  { key: "contact", label: "设施与联系" }
];
function buildLayoutOptions(unit) {
  return Array.from({ length: 11 }, (_, index) => ({
    label: `${index}${unit}`,
    value: index
  }));
}

const ROOM_OPTIONS = buildLayoutOptions("室");
const HALL_OPTIONS = buildLayoutOptions("厅");
const BATH_OPTIONS = buildLayoutOptions("卫");
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

function getStepState(stepIndex = 0) {
  const safeStepIndex = Math.min(Math.max(Number(stepIndex) || 0, 0), STEP_LIST.length - 1);
  return {
    currentStep: safeStepIndex,
    progressPercent: ((safeStepIndex + 1) / STEP_LIST.length) * 100,
    progressStepText: `${safeStepIndex + 1}/${STEP_LIST.length}`,
    progressLabel: STEP_LIST[safeStepIndex]?.label || ""
  };
}

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
    layoutText: "",
    city: "",
    area: "",
    address: "",
    description: "",
    minRentPeriod: DEFAULT_MIN_RENT_PERIOD,
    floor: "",
    region: "",
    latitude: 0,
    longitude: 0,
    facilities: cloneFacilities(),
    contactName: "",
    contactPhone: ""
  };
}

function getStepValidationResult(stepIndex, formData = {}, imageCount = 0) {
  if (stepIndex === 0) {
    if (!imageCount) {
      return { valid: false, message: "请至少上传1张图片" };
    }
    if (!String(formData.title || "").trim()) {
      return { valid: false, message: "房源标题不能为空" };
    }
    if (!Number(formData.price)) {
      return { valid: false, message: "请填写月租金" };
    }
    if (!String(formData.layoutText || formData.type || "").trim()) {
      return { valid: false, message: "请选择户型" };
    }
    const layoutMatched = String(formData.layoutText || "").match(/^(\d+)室(\d+)厅(\d+)卫$/);
    if (!layoutMatched || Number(layoutMatched[1]) <= 0) {
      return { valid: false, message: "室数至少为 1" };
    }
    if (!Number(formData.area)) {
      return { valid: false, message: "请填写面积" };
    }
    if (!Number.isInteger(Number(formData.minRentPeriod)) || Number(formData.minRentPeriod) <= 0) {
      return { valid: false, message: "最短租期需为正整数月份" };
    }
  }

  if (stepIndex === 1) {
    if (!String(formData.address || "").trim()) {
      return { valid: false, message: "请输入详细地址" };
    }
  }

  if (stepIndex === 2) {
    if (!String(formData.contactName || "").trim()) {
      return { valid: false, message: "请输入联系人" };
    }
    if (!isPhone(String(formData.contactPhone || "").trim())) {
      return { valid: false, message: "联系电话格式错误" };
    }
  }

  return { valid: true, message: "" };
}

function buildRegionOptions(regions = []) {
  return FALLBACK_REGION_OPTIONS.concat(
    (Array.isArray(regions) ? regions : []).map((item) => ({
      label: item.name || "",
      value: item.name || "",
      city: item.city || ""
    }))
  );
}

function getRegionIndex(regionOptions = [], region = "", city = "") {
  if (!region) {
    return 0;
  }

  const normalizedCity = String(city || "").trim();
  const index = regionOptions.findIndex((item) => (
    item.value === region
    && (!normalizedCity || !item.city || item.city === normalizedCity)
  ));
  if (index >= 0) {
    return index;
  }

  const fallbackIndex = regionOptions.findIndex((item) => item.value === region);
  return fallbackIndex >= 0 ? fallbackIndex : 0;
}

function matchCityByLocation(locationDetail = {}) {
  const candidates = [
    locationDetail?.city,
    locationDetail?.addressComponent?.city,
    locationDetail?.adInfo?.city
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  return candidates[0] || "";
}

function filterRegionOptionsByCity(regionOptions = [], city = "") {
  const normalizedCity = String(city || "").trim();
  if (!normalizedCity) {
    return Array.isArray(regionOptions) ? regionOptions : [];
  }

  const regionList = Array.isArray(regionOptions) ? regionOptions : [];
  const sameCityOptions = regionList.filter((item) => !item.value || !item.city || item.city === normalizedCity);
  return sameCityOptions.length ? sameCityOptions : regionList;
}

function matchRegionByLocation(regionOptions = [], locationDetail = {}, formattedAddress = "") {
  const normalizedCity = matchCityByLocation(locationDetail);
  const scopedCandidates = filterRegionOptionsByCity(regionOptions, normalizedCity);
  const normalizedAddress = String(
    formattedAddress
    || locationDetail?.formattedAddress
    || locationDetail?.address
    || ""
  ).trim();
  const districtCandidates = [
    locationDetail?.district,
    locationDetail?.addressComponent?.district,
    locationDetail?.adInfo?.district
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  const districtMatched = scopedCandidates.find((item) => districtCandidates.includes(String(item?.value || "").trim()));

  if (districtMatched) {
    return districtMatched.value;
  }

  if (!normalizedAddress) {
    return "";
  }

  const matched = scopedCandidates
    .filter((item) => item && item.value && item.value !== "全市")
    .sort((left, right) => String(right.value || "").length - String(left.value || "").length)
    .find((item) => normalizedAddress.includes(String(item.value || "").trim()));

  return matched ? matched.value : "";
}

function buildPickedLocationAddress(address = "", name = "") {
  const normalizedAddress = String(address || "").trim();
  const normalizedName = String(name || "").trim();

  if (normalizedAddress && normalizedName && !normalizedAddress.includes(normalizedName)) {
    return `${normalizedAddress}${normalizedName}`;
  }

  return normalizedAddress || normalizedName;
}

function getOptionIndexByValue(options = [], value) {
  const index = options.findIndex((item) => item.value === value);
  return index >= 0 ? index : 0;
}

function buildLayoutText(roomCount, hallCount, bathCount) {
  if (roomCount < 0 || hallCount < 0 || bathCount < 0) {
    return "";
  }

  return `${roomCount}室${hallCount}厅${bathCount}卫`;
}

function getHouseTypeByLayout(roomCount, hallCount) {
  if (roomCount >= 3) {
    return HOUSE_TYPE.THREE_PLUS;
  }

  if (roomCount === 2) {
    return HOUSE_TYPE.TWO_BEDROOM;
  }

  if (roomCount === 1) {
    return hallCount > 0 ? HOUSE_TYPE.ONE_BEDROOM : HOUSE_TYPE.STUDIO;
  }

  return "";
}

function buildLayoutFields(selectedRoomIndex, selectedHallIndex, selectedBathIndex) {
  const roomCount = Number(ROOM_OPTIONS[selectedRoomIndex]?.value || 0);
  const hallCount = Number(HALL_OPTIONS[selectedHallIndex]?.value ?? -1);
  const bathCount = Number(BATH_OPTIONS[selectedBathIndex]?.value ?? -1);
  const layoutText = buildLayoutText(roomCount, hallCount, bathCount);

  return {
    type: layoutText ? (getHouseTypeByLayout(roomCount, hallCount) || layoutText) : "",
    layoutText
  };
}

function resolveLayoutState(type = "", layoutText = "") {
  const normalizedType = String(type || "").trim();
  const normalizedLayoutText = String(layoutText || "").trim();
  const layoutSource = normalizedLayoutText || normalizedType;
  const matched = layoutSource.match(/^(\d+)室(\d+)厅(\d+)卫$/);

  if (matched) {
    return {
      selectedRoomIndex: getOptionIndexByValue(ROOM_OPTIONS, Number(matched[1])),
      selectedHallIndex: getOptionIndexByValue(HALL_OPTIONS, Number(matched[2])),
      selectedBathIndex: getOptionIndexByValue(BATH_OPTIONS, Number(matched[3]))
    };
  }

  if (normalizedType === HOUSE_TYPE.STUDIO) {
    return {
      selectedRoomIndex: getOptionIndexByValue(ROOM_OPTIONS, 1),
      selectedHallIndex: getOptionIndexByValue(HALL_OPTIONS, 0),
      selectedBathIndex: getOptionIndexByValue(BATH_OPTIONS, 1)
    };
  }

  if (normalizedType === HOUSE_TYPE.ONE_BEDROOM) {
    return {
      selectedRoomIndex: getOptionIndexByValue(ROOM_OPTIONS, 1),
      selectedHallIndex: getOptionIndexByValue(HALL_OPTIONS, 1),
      selectedBathIndex: getOptionIndexByValue(BATH_OPTIONS, 1)
    };
  }

  if (normalizedType === HOUSE_TYPE.TWO_BEDROOM) {
    return {
      selectedRoomIndex: getOptionIndexByValue(ROOM_OPTIONS, 2),
      selectedHallIndex: getOptionIndexByValue(HALL_OPTIONS, 1),
      selectedBathIndex: getOptionIndexByValue(BATH_OPTIONS, 1)
    };
  }

  if (normalizedType === HOUSE_TYPE.THREE_PLUS) {
    return {
      selectedRoomIndex: getOptionIndexByValue(ROOM_OPTIONS, 3),
      selectedHallIndex: getOptionIndexByValue(HALL_OPTIONS, 1),
      selectedBathIndex: getOptionIndexByValue(BATH_OPTIONS, 1)
    };
  }

  return {
    selectedRoomIndex: 0,
    selectedHallIndex: 0,
    selectedBathIndex: 0
  };
}

Page({
  data: {
    isEdit: false,
    houseId: "",
    ...getStepState(0),
    submitting: false,
    loadingDetail: false,
    errorText: "",
    formData: createInitialForm(),
    imageList: [],
    roomOptions: ROOM_OPTIONS,
    hallOptions: HALL_OPTIONS,
    bathOptions: BATH_OPTIONS,
    regionOptions: FALLBACK_REGION_OPTIONS,
    facilityOptions: FACILITY_OPTIONS,
    selectedRoomIndex: 0,
    selectedHallIndex: 0,
    selectedBathIndex: 0,
    layoutPickerValue: [0, 0, 0],
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
      await toast.error("仅房东可发布房源");
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
    const layoutState = resolveLayoutState(formData.type, formData.layoutText);
    this.clearTitleHighlightTimer();
    this.setData({
      isEdit: false,
      houseId: "",
      submitting: false,
      loadingDetail: false,
      errorText: "",
      formData,
      imageList: [],
      selectedRoomIndex: layoutState.selectedRoomIndex,
      selectedHallIndex: layoutState.selectedHallIndex,
      selectedBathIndex: layoutState.selectedBathIndex,
      layoutPickerValue: [
        layoutState.selectedRoomIndex,
        layoutState.selectedHallIndex,
        layoutState.selectedBathIndex
      ],
      selectedRegionIndex: getRegionIndex(this.data.regionOptions, formData.region, formData.city),
      ...getStepState(0),
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
    const currentCity = this.data.formData.city || "";

    try {
      logger.info("api_call", { func: "house.getRegions", params: {} });
      const regions = await houseService.getRegions();
      const regionOptions = buildRegionOptions(regions);
      this.setData({
        regionOptions,
        selectedRegionIndex: getRegionIndex(regionOptions, currentRegion, currentCity)
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
    const layoutState = resolveLayoutState(formData.type, formData.layoutText);
    return {
      isEdit: true,
      houseId: String(nextHouseId || ""),
      errorText: "",
      formData,
      imageList: [],
      selectedRoomIndex: layoutState.selectedRoomIndex,
      selectedHallIndex: layoutState.selectedHallIndex,
      selectedBathIndex: layoutState.selectedBathIndex,
      layoutPickerValue: [
        layoutState.selectedRoomIndex,
        layoutState.selectedHallIndex,
        layoutState.selectedBathIndex
      ],
      selectedRegionIndex: getRegionIndex(this.data.regionOptions, formData.region, formData.city),
      ...getStepState(0)
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
        layoutText: detail.layoutText || "",
        city: detail.city || "",
        area: detail.area ? String(detail.area) : "",
        address: detail.address || "",
        description: detail.description || "",
        minRentPeriod: Number(detail.minRentPeriod) > 0
          ? String(detail.minRentPeriod)
          : DEFAULT_MIN_RENT_PERIOD,
        floor: detail.floor || "",
        region: detail.region || "",
        latitude: Number(detail.latitude || 0),
        longitude: Number(detail.longitude || 0),
        facilities: cloneFacilities(detail.facilities),
        contactName: detail.contactName || "",
        contactPhone: detail.contactPhone || ""
      };
      const layoutState = resolveLayoutState(formData.type, formData.layoutText);
      const layoutFields = buildLayoutFields(
        layoutState.selectedRoomIndex,
        layoutState.selectedHallIndex,
        layoutState.selectedBathIndex
      );
      formData.type = layoutFields.type || formData.type;
      formData.layoutText = layoutFields.layoutText || formData.layoutText;

      this.setData({
        isEdit: true,
        houseId: normalizedHouseId,
        errorText: "",
        formData,
        imageList: (detail.images || []).map((url) => ({
          url,
          progress: 100,
          uploading: false
        })),
        selectedRoomIndex: layoutState.selectedRoomIndex,
        selectedHallIndex: layoutState.selectedHallIndex,
        selectedBathIndex: layoutState.selectedBathIndex,
        layoutPickerValue: [
          layoutState.selectedRoomIndex,
          layoutState.selectedHallIndex,
          layoutState.selectedBathIndex
        ],
        selectedRegionIndex: getRegionIndex(this.data.regionOptions, formData.region, formData.city),
        ...getStepState(0)
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
      await toast.error(error.message || "加载失败");
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

  updateLayoutSelection(partialState = {}) {
    const selectedRoomIndex = partialState.selectedRoomIndex ?? this.data.selectedRoomIndex;
    const selectedHallIndex = partialState.selectedHallIndex ?? this.data.selectedHallIndex;
    const selectedBathIndex = partialState.selectedBathIndex ?? this.data.selectedBathIndex;
    const layoutFields = buildLayoutFields(selectedRoomIndex, selectedHallIndex, selectedBathIndex);

    this.setData({
      selectedRoomIndex,
      selectedHallIndex,
      selectedBathIndex,
      layoutPickerValue: [selectedRoomIndex, selectedHallIndex, selectedBathIndex],
      "formData.type": layoutFields.type,
      "formData.layoutText": layoutFields.layoutText
    });

    return layoutFields;
  },

  onLayoutPickerChange(event) {
    const value = Array.isArray(event.detail?.value) ? event.detail.value : [];
    const selectedRoomIndex = Number(value[0] || 0);
    const selectedHallIndex = Number(value[1] || 0);
    const selectedBathIndex = Number(value[2] || 0);
    const layoutFields = this.updateLayoutSelection({
      selectedRoomIndex,
      selectedHallIndex,
      selectedBathIndex
    });
    logger.info("publish_layout_picker_change_end", {
      selectedRoomIndex,
      selectedHallIndex,
      selectedBathIndex,
      type: layoutFields.type,
      layoutText: layoutFields.layoutText
    });
  },

  onRoomChange(event) {
    logger.info("publish_room_change_start", { value: event.detail.value });
    const selectedRoomIndex = Number(event.detail.value) || 0;
    const layoutFields = this.updateLayoutSelection({ selectedRoomIndex });
    logger.info("publish_room_change_end", {
      selectedRoomIndex,
      type: layoutFields.type,
      layoutText: layoutFields.layoutText
    });
  },

  onHallChange(event) {
    logger.info("publish_hall_change_start", { value: event.detail.value });
    const selectedHallIndex = Number(event.detail.value) || 0;
    const layoutFields = this.updateLayoutSelection({ selectedHallIndex });
    logger.info("publish_hall_change_end", {
      selectedHallIndex,
      type: layoutFields.type,
      layoutText: layoutFields.layoutText
    });
  },

  onBathChange(event) {
    logger.info("publish_bath_change_start", { value: event.detail.value });
    const selectedBathIndex = Number(event.detail.value) || 0;
    const layoutFields = this.updateLayoutSelection({ selectedBathIndex });
    logger.info("publish_bath_change_end", {
      selectedBathIndex,
      type: layoutFields.type,
      layoutText: layoutFields.layoutText
    });
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
      if (!result || Object.prototype.toString.call(result) !== "[object Object]") {
        logger.warn("publish_choose_location_empty_result", {});
        await toast.error("未获取到定位结果");
        return;
      }
      const address = buildPickedLocationAddress(result.address, result.name);
      const latitude = Number(result.latitude || 0);
      const longitude = Number(result.longitude || 0);

      this.setData({
        "formData.address": address || this.data.formData.address,
        "formData.latitude": latitude,
        "formData.longitude": longitude
      });

      if (latitude && longitude) {
        try {
          const reverseGeocodeResult = await mapService.reverseGeocode(latitude, longitude);
          const nextAddress = String(
            reverseGeocodeResult?.formattedAddress
            || reverseGeocodeResult?.address
            || address
            || this.data.formData.address
          ).trim();
          const matchedCity = matchCityByLocation(reverseGeocodeResult);
          const matchedRegion = matchRegionByLocation(
            this.data.regionOptions,
            reverseGeocodeResult,
            nextAddress
          );
          const nextData = {
            "formData.address": nextAddress
          };

          if (matchedCity) {
            nextData["formData.city"] = matchedCity;
          }

          if (matchedRegion) {
            nextData["formData.region"] = matchedRegion;
            nextData.selectedRegionIndex = getRegionIndex(this.data.regionOptions, matchedRegion, matchedCity);
          }

          this.setData(nextData);
        } catch (error) {
          logger.warn("publish_choose_location_reverse_geocode_failed", {
            err: error.message || "逆地址解析失败"
          });
        }
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
      logger.error("publish_choose_location_failed", {
        error: error?.message || errMsg || "定位选择失败"
      });
      await toast.error("定位选择失败");
    }
  },

  async onChooseImages() {
    logger.info("publish_choose_images_start", {});
    try {
      const currentCount = this.data.imageList.length;
      const maxCount = 9;
      if (currentCount >= maxCount) {
        await toast.error("最多上传9张图片");
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
        tempFilePath: item.tempFilePath,
        progress: 0,
        uploading: false
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

  validateStep(stepIndex = this.data.currentStep) {
    return getStepValidationResult(stepIndex, this.data.formData, this.data.imageList.length);
  },

  onStepTap(event) {
    const nextStep = Number(event.currentTarget.dataset.step);
    if (Number.isNaN(nextStep)) {
      return;
    }

    if (nextStep <= this.data.currentStep) {
      this.setData(getStepState(nextStep));
      return;
    }

    const validationResult = this.validateStep(this.data.currentStep);
    if (!validationResult.valid) {
      toast.error(validationResult.message);
      return;
    }

    this.setData(getStepState(nextStep));
  },

  onPrevStepTap() {
    if (this.data.currentStep <= 0) {
      return;
    }

    this.setData(getStepState(this.data.currentStep - 1));
  },

  onNextStepTap() {
    const validationResult = this.validateStep(this.data.currentStep);
    if (!validationResult.valid) {
      toast.error(validationResult.message);
      return;
    }

    if (this.data.currentStep >= STEP_LIST.length - 1) {
      return;
    }

    this.setData(getStepState(this.data.currentStep + 1));
  },

  buildSubmitPayload(images) {
    logger.debug("publish_build_payload_start", {});
    const form = this.data.formData;
    const payload = {
      title: form.title.trim(),
      price: Number(form.price) || 0,
      type: form.type.trim(),
      layoutText: String(form.layoutText || "").trim(),
      city: String(form.city || "").trim(),
      area: Number(form.area) || 0,
      address: form.address.trim(),
      description: form.description.trim(),
      minRentPeriod: Number(form.minRentPeriod) || Number(DEFAULT_MIN_RENT_PERIOD),
      floor: String(form.floor || "").trim(),
      orientation: "",
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
        this.setData({
          [`imageList[${i}].uploading`]: true,
          [`imageList[${i}].progress`]: 0
        });
        const uploadTask = wx.cloud.uploadFile({
          cloudPath,
          filePath: sourcePath.trim()
        });

        if (uploadTask && typeof uploadTask.onProgressUpdate === "function") {
          uploadTask.onProgressUpdate((progressEvent = {}) => {
            this.setData({
              [`imageList[${i}].progress`]: Number(progressEvent.progress || 0)
            });
          });
        }

        // eslint-disable-next-line no-await-in-loop
        const uploadRes = await uploadTask;
        const fileID = uploadRes.fileID;
        this.setData({
          [`imageList[${i}].url`]: fileID,
          [`imageList[${i}].uploading`]: false,
          [`imageList[${i}].progress`]: 100
        });
        uploaded.push(fileID);
      } catch (error) {
        this.setData({
          [`imageList[${i}].uploading`]: false,
          [`imageList[${i}].progress`]: 0
        });
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

  async submitHouse() {
    logger.info("publish_submit_start", { isEdit: this.data.isEdit });
    if (this.data.submitting) {
      logger.info("publish_submit_end", { blocked: "submitting" });
      return;
    }

    const baseCheck = validateHouseForm(this.data.formData);
    if (!baseCheck.valid) {
      await toast.error(baseCheck.message);
      logger.info("publish_submit_end", { blocked: "invalid_house_form" });
      return;
    }

    if (!isPhone(this.data.formData.contactPhone)) {
      await toast.error("联系电话格式错误");
      logger.info("publish_submit_end", { blocked: "invalid_phone" });
      return;
    }

    if (!this.data.imageList.length) {
      await toast.error("请至少上传1张图片");
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
      await toast.success(this.data.isEdit ? "修改成功" : "发布成功");
      setTimeout(() => {
        switchTab(ROUTES.PUBLISH);
      }, 600);
    } catch (error) {
      logger.error("api_error", {
        func: this.data.isEdit ? "house.update" : "house.create",
        err: error.message
      });
      await toast.error(error.message || "提交失败");
    } finally {
      this.setData({ submitting: false });
      logger.info("publish_submit_end", {});
    }
  },

  async onSubmitTap() {
    if (this.data.currentStep < STEP_LIST.length - 1) {
      this.onNextStepTap();
      return;
    }

    const validationResult = this.validateStep(this.data.currentStep);
    if (!validationResult.valid) {
      await toast.error(validationResult.message);
      return;
    }

    await this.submitHouse();
  },

  async reloadHouseDetail() {
    if (!this.data.houseId) {
      return;
    }

    await this.loadHouseDetail(this.data.houseId, { resetBeforeLoad: true });
  }
});
