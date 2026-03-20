function normalizeType(type) {
  const allowed = ["card", "list-item", "detail", "profile"];
  return allowed.includes(type) ? type : "card";
}

function normalizeCount(count) {
  const numericCount = Number(count);
  if (!Number.isFinite(numericCount) || numericCount < 1) {
    return 0;
  }
  return Math.floor(numericCount);
}

function createItems(count) {
  return Array.from({ length: count }, (_, index) => index);
}

Component({
  properties: {
    type: {
      type: String,
      value: "card"
    },
    count: {
      type: Number,
      value: 0
    }
  },

  data: {
    normalizedType: "card",
    items: [0],
    isCard: true,
    isListItem: false,
    isDetail: false,
    isProfile: false
  },

  lifetimes: {
    attached() {
      this.syncState();
    }
  },

  observers: {
    "type, count": function observer() {
      this.syncState();
    }
  },

  methods: {
    syncState() {
      const normalizedType = normalizeType(this.data.type);
      let count = normalizeCount(this.data.count);

      const needAutoCount = count === 0 && normalizedType === "list-item";
      if (count === 0) {
        count = needAutoCount ? 5 : 1;
      }

      this.setData({
        normalizedType,
        items: createItems(count),
        isCard: normalizedType === "card",
        isListItem: normalizedType === "list-item",
        isDetail: normalizedType === "detail",
        isProfile: normalizedType === "profile"
      });

      if (needAutoCount) {
        wx.getSystemInfo({
          success: (sysInfo) => {
            const autoCount = Math.max(1, Math.ceil(sysInfo.windowHeight / 100));
            if (autoCount !== count) {
              this.setData({ items: createItems(autoCount) });
            }
          }
        });
      }
    }
  }
});
