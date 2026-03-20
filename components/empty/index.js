function normalizeBtnType(type) {
  return type === "primary" ? "primary" : "ghost";
}

Component({
  properties: {
    icon: {
      type: String,
      value: ""
    },
    title: {
      type: String,
      value: ""
    },
    subtitle: {
      type: String,
      value: ""
    },
    btnText: {
      type: String,
      value: ""
    },
    btnType: {
      type: String,
      value: "ghost"
    }
  },

  data: {
    normalizedBtnType: "ghost"
  },

  lifetimes: {
    attached() {
      this.syncState();
      if (this.data.btnText) {
        console.warn("[Empty Component] btn-text was provided, ensure bindbtntap is bound to avoid dead ends.");
      }
    }
  },

  observers: {
    btnType() {
      this.syncState();
    }
  },

  methods: {
    syncState() {
      this.setData({
        normalizedBtnType: normalizeBtnType(this.data.btnType)
      });
    },

    handleBtnTap() {
      this.triggerEvent("btntap");
    }
  }
});
