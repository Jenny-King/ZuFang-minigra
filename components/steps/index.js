function normalizeSteps(steps) {
  if (!Array.isArray(steps)) {
    return [];
  }

  return steps
    .map((step) => (typeof step === "string" ? step.trim() : ""))
    .filter(Boolean);
}

function normalizeCurrent(current, length) {
  if (!length) {
    return 0;
  }

  const numericCurrent = Number(current);
  if (!Number.isFinite(numericCurrent)) {
    return 0;
  }

  return Math.min(Math.max(0, Math.floor(numericCurrent)), length - 1);
}

Component({
  properties: {
    steps: {
      type: Array,
      value: []
    },
    current: {
      type: Number,
      value: 0
    }
  },

  data: {
    stepItems: []
  },

  lifetimes: {
    attached() {
      this.syncState();
    }
  },

  observers: {
    "steps, current": function observer() {
      this.syncState();
    }
  },

  methods: {
    syncState() {
      const normalizedSteps = normalizeSteps(this.data.steps);
      const current = normalizeCurrent(this.data.current, normalizedSteps.length);

      const stepItems = normalizedSteps.map((label, index) => {
        let status = "pending";
        if (index < current) {
          status = "completed";
        } else if (index === current) {
          status = "current";
        }

        return {
          label,
          status,
          isLast: index === normalizedSteps.length - 1,
          lineStatus: index < current ? "completed" : "pending",
          displayText: index < current ? "✓" : String(index + 1)
        };
      });

      this.setData({ stepItems });
    }
  }
});
