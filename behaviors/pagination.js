const { REQUEST_DEFAULT } = require("../config/constants");
const { logger } = require("../utils/logger");

module.exports = Behavior({
  data: {
    page: REQUEST_DEFAULT.PAGE,
    pageSize: REQUEST_DEFAULT.PAGE_SIZE,
    total: 0,
    hasMore: true,
    listLoading: false,
    listRefreshing: false
  },

  methods: {
    resetPaginationState() {
      this.setData({
        page: REQUEST_DEFAULT.PAGE,
        total: 0,
        hasMore: true
      });
    },

    updatePaginationByResult(result = {}, pageSize = this.data.pageSize) {
      const total = Number(result.total || 0);
      const currentPage = Number(result.page || this.data.page || REQUEST_DEFAULT.PAGE);
      const currentPageSize = Number(result.pageSize || pageSize || REQUEST_DEFAULT.PAGE_SIZE);
      const loadedCount = currentPage * currentPageSize;
      const hasMore = loadedCount < total;

      this.setData({
        total,
        page: currentPage,
        hasMore
      });
    },

    async loadPage(options = {}) {
      const {
        fetcher,
        concat = true,
        initial = false,
        onSuccess,
        listField = "list"
      } = options;

      if (typeof fetcher !== "function") {
        throw new Error("fetcher 必须是函数");
      }

      if (this.data.listLoading) {
        return;
      }

      if (!initial && !this.data.hasMore) {
        return;
      }

      const nextPage = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;

      this.setData({
        listLoading: true,
        listRefreshing: Boolean(initial)
      });

      try {
        const result = await fetcher({
          page: nextPage,
          pageSize: this.data.pageSize
        });

        const remoteList = Array.isArray(result.list) ? result.list : [];
        const prevList = Array.isArray(this.data[listField]) ? this.data[listField] : [];
        const mergedList = initial || !concat ? remoteList : prevList.concat(remoteList);

        this.setData({
          [listField]: mergedList
        });

        this.updatePaginationByResult({
          total: result.total,
          page: nextPage,
          pageSize: this.data.pageSize
        });

        if (typeof onSuccess === "function") {
          onSuccess(result);
        }
      } catch (error) {
        logger.error("pagination_load_failed", {
          route: this.route || "",
          error: error.message
        });
        throw error;
      } finally {
        this.setData({
          listLoading: false,
          listRefreshing: false
        });
      }
    }
  }
});
