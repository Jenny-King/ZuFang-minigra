const HEIGHT_CLASS_MAP = {
  "76rpx": "lazy-image--height-76",
  "80rpx": "lazy-image--height-80",
  "92rpx": "lazy-image--height-92",
  "108rpx": "lazy-image--height-108",
  "140rpx": "lazy-image--height-140",
  "148rpx": "lazy-image--height-148",
  "160rpx": "lazy-image--height-160",
  "180rpx": "lazy-image--height-180",
  "200rpx": "lazy-image--height-200",
  "220rpx": "lazy-image--height-220",
  "260rpx": "lazy-image--height-260",
  "308rpx": "lazy-image--height-308",
  "340rpx": "lazy-image--height-340",
  "440rpx": "lazy-image--height-440"
};

const RADIUS_CLASS_MAP = {
  "4rpx": "lazy-image--radius-xs",
  "8rpx": "lazy-image--radius-sm",
  "12rpx": "lazy-image--radius-md",
  "20rpx": "lazy-image--radius-lg",
  "24rpx": "lazy-image--radius-xl",
  "28rpx": "lazy-image--radius-2xl",
  "36rpx": "lazy-image--radius-panel",
  "999rpx": "lazy-image--radius-pill",
  "var(--radius-xs)": "lazy-image--radius-xs",
  "var(--radius-sm)": "lazy-image--radius-sm",
  "var(--radius-md)": "lazy-image--radius-md",
  "var(--radius-lg)": "lazy-image--radius-lg",
  "var(--radius-xl)": "lazy-image--radius-xl",
  "var(--radius-2xl)": "lazy-image--radius-2xl",
  "var(--radius-panel)": "lazy-image--radius-panel",
  "var(--radius-pill)": "lazy-image--radius-pill"
};

function resolveHeightClass(height) {
  return HEIGHT_CLASS_MAP[height] || HEIGHT_CLASS_MAP["340rpx"];
}

function resolveRadiusClass(radius) {
  return RADIUS_CLASS_MAP[radius] || RADIUS_CLASS_MAP["var(--radius-md)"];
}

Component({
  properties: {
    src: {
      type: String,
      value: ""
    },
    mode: {
      type: String,
      value: "aspectFill"
    },
    radius: {
      type: String,
      value: "var(--radius-md)"
    },
    width: {
      type: String,
      value: ""
    },
    height: {
      type: String,
      value: "340rpx"
    }
  },

  data: {
    sizeStyle: "",
    heightClass: "lazy-image--height-92",
    radiusClass: "lazy-image--radius-md",
    hasSource: false,
    loading: false,
    loaded: false,
    error: false
  },

  lifetimes: {
    attached() {
      this.syncShape();
      this.syncSourceState(this.data.src);
    }
  },

  observers: {
    "height, radius, width": function observer() {
      this.syncShape();
    },
    src(newValue) {
      this.syncSourceState(newValue);
    }
  },

  methods: {
    syncShape() {
      const width = typeof this.data.width === "string" ? this.data.width.trim() : "";
      this.setData({
        sizeStyle: width ? `width: ${width};` : "",
        heightClass: resolveHeightClass(this.data.height),
        radiusClass: resolveRadiusClass(this.data.radius)
      });
    },

    syncSourceState(src) {
      const hasSource = typeof src === "string" && Boolean(src.trim());
      this.setData({
        hasSource,
        loading: hasSource,
        loaded: false,
        error: !hasSource
      });
    },

    handleLoad() {
      this.setData({
        loading: false,
        loaded: true,
        error: false
      });
      this.triggerEvent("load");
    },

    handleError(event) {
      this.setData({
        loading: false,
        loaded: false,
        error: true
      });
      this.triggerEvent("error", event.detail);
    }
  }
});
