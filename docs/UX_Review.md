# UX Review: ZuFang Mini Program

| Screen | Visual Hierarchy / 视觉层级 | WeChat Design Compliance / 微信设计合规 | UX Flow / 交互流程 | Consistency / 一致性 | Top Issue / 核心问题 |
|--------|-----------------|--------------------------|---------|-------------|-----------|
| Homepage (首页) | Clear (Search -> Filter -> Feed) / 层级清晰 | Filter chips height < 44px min tap target / 筛选标签未达44px热区标准 | Intuitive / 直观 | High / 高 | Filter chips tap target too small / 筛选便签触碰区过小 |
| Listing Detail (详情) | Logical (Gallery -> Info -> Map) / 逻辑连贯 | Map lacks interaction confinement / 地图缺少手势约束 | Standard / 标准 | High / 高 | Native `<map>` component scroll interception / 原生地图阻断页面滑动 |
| Publish Listing (发布) | Grouped into wizard chunks / 步骤分组清晰 | Image `remove-btn` lacks tap padding / 删除按钮热区盲区过小 | Step-by-step / 渐进式 | High / 高 | Tiny image deletion button without safe padding / 图库删除按钮极难点击 |
| My Listings (管理) | Stats -> Tabs -> Feed / 层级明确 | Draggable bottom sheet over `<map>` mimics iOS, buggy in MP / 地图堆叠拖拽面板误用iOS模式 | Needs fix / 需修正 | High / 高 | iOS Maps-style custom draggable sheet triggers touch conflicts / 仿iOS地图拖拽层引发触摸冲突 |
| Chat (消息) | Search -> List / 结构标准 | Missing `safe-area-inset-bottom` / 列表底部缺少安全区参数 | Direct / 直接 | Moderate / 中 | List items blocked by Home Indicator/TabBar / 列表底边被安全区遮挡 |
| Profile (我的) | Hero -> Dashboard -> Tools / 模块分明 | Custom account switcher defies native auth norms / 自带多账号面板打破微信基础授权流 | Efficient / 高效 | High / 高 | Over-complex cache-based account switcher / 繁度过高的缓存账号切换体系 |

---

### 1. Critical (P0) / 严重问题 (P0)

- **[My Listings / Tenant Mode] Draggable sheet over `<map>`**
  **Problem:** Draggable bottom-sheet gesture handling over native `<map>` is an iOS Maps-native pattern misused in WeChat. Native `<map>` event interception permanently fractures custom `.tenant-sheet-handle` touch-drag performance.
  *(在 `<map>` 上叠加可拖拽半屏弹窗是典型的iOS原生反模式，微信同层渲染环境会直接捕获底层触摸事件导致上拉手势撕裂。)*
  > **✅ 解决方案 (Solution):** 
  > 放弃手写拖拽逻辑，改用系统提供的机制或静态切换。建议使用 `cover-view` 作为一个固定位置的点击按钮来进行纯净的“地图/列表”双视图切换。
  > ```xml
  > <!-- 移除手写 touch 事件，改为点击直接展开/收起高度 -->
  > <cover-view class="tenant-view-toggle-pill" bindtap="onToggleTenantSheet">
  >   查看附近列表面板
  > </cover-view>
  > ```

- **[My Listings / Landlord Mode] Custom swipe-to-delete**
  **Problem:** Custom swipe-to-delete logic relies on hand-rolled `bindtouchstart="onCardTouchStart"` inside a vertical scroll-view, triggering severe gesture fights on Android & iOS MP engines.
  *(使用自定义的触摸事件来实现列表项左滑删除会与页面纵轴滚动发生极度手势冲突。)*
  > **✅ 解决方案 (Solution):**
  > 引入微信官方扩展组件库中的 `mp-slideview` 彻底替换现有的手写监听。或通过 `<movable-area>` 与 `<movable-view>` 实现原生性能的滑动。
  > ```xml
  > <mp-slideview buttons="{{slideButtons}}" bindbuttontap="slideButtonTap">
  >   <view class="listing-card">...</view>
  > </mp-slideview>
  > ```

- **[Listing Detail] Map component scroll interception**
  **Problem:** Inline `<map>` component intercepts user's vertical page scrolling.
  *(详情页内嵌的原生 `<map>` 会强制截停用户的向下滑屏意图。)*
  > **✅ 解决方案 (Solution):**
  > 为地图添加只读属性，阻断其对滑动事件的内置吸收。仅在用户点击时通过 `wx.openLocation` 或全屏模式打开地图。
  > ```xml
  > <map 
  >   class="detail-map" 
  >   enable-scroll="{{false}}" 
  >   enable-zoom="{{false}}" 
  >   bindtap="onMapTap"
  >   ... />
  > ```

---

### 2. Important (P1) / 重要缺陷 (P1)

- **[Chat] Missing `safe-area-inset-bottom`**
  **Problem:** The `.list-scroll` container completely misses variable spacing padding (`padding-bottom: env(safe-area-inset-bottom)`). 
  *(聊天列表未做底部安全区域规避，底端记录会被 iPhone "小黑条" 遮挡)*
  > **✅ 解决方案 (Solution):**
  > 在容器的 CSS 底部注入环境变量，撑开安全距离。
  > ```css
  > .list-scroll {
  >   padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  > }
  > ```

- **[Homepage] Filter chips tap area**
  **Problem:** Search filter chips strictly define `min-height: 56rpx` (28px) violating WeChat design guidelines requiring tap targets to be ≥44px (88rpx).
  *(首页条件筛选便签高度仅28px（56rpx），未达微信标准的44px/88rpx热区。)*
  > **✅ 解决方案 (Solution):**
  > 利用透明 `padding` 扩大物理热区，而不改变中心视觉。
  > ```css
  > .filter-chip {
  >   min-height: 56rpx;
  >   padding: 16rpx 22rpx; /* 上下充填透明触摸区 */
  >   margin: -16rpx 0;    /* 视觉位置补偿回弹 */
  > }
  > ```

- **[Publish Listing] Textarea keyboard occlusion**
  **Problem:** Native `<textarea>` inside long scrollable inputs will suffer from iOS keyboard occlusion.
  *(原生 `<textarea>` 下半屏打字必会面临键盘覆写遮挡。)*
  > **✅ 解决方案 (Solution):**
  > 加持 `cursor-spacing` 属性强行上推视野。
  > ```xml
  > <textarea cursor-spacing="100" show-confirm-bar="{{true}}" ... />
  > ```

- **[Publish Listing] Image `remove-btn` hot-area**
  **Problem:** Close/Delete image `.remove-btn` uses visual CSS boundaries devoid of invisible touch expansion limits.
  *(图片矩阵左上角的关闭 `×` 原地限制在极小边距内，容易误触。)*
  > **✅ 解决方案 (Solution):**
  > 使用负向 `margin` / 增加 `padding` 来无限延伸响应阈。
  > ```css
  > .remove-btn {
  >   padding: 24rpx; /* 外扩不可见热区边界 */
  >   right: -24rpx;
  >   top: -24rpx;
  > }
  > ```

- **[Profile] Over-complex Account Switcher**
  **Problem:** The explicit account switcher (`.account-switcher-panel`) forces users into building cache histories instead of immediate integrations.
  *(自定义多账号登录记录浮层繁琐，违背即用即走理念。)*
  > **✅ 解决方案 (Solution):**
  > 剥除复杂的弹窗体系，转为纯粹的头像快捷授权组件介入。
  > ```xml
  > <button class="avatar-wrapper" open-type="chooseAvatar" bindchooseavatar="onChooseAvatar">
  >   获取头像更新身份
  > </button>
  > ```

---

### 3. Quick Wins / 快速优化

- **[Chat] Missing `confirm-type` in search**
  **Problem:** Missing fast-execution properties inside the top header structural input.
  *(搜索栏软键盘缺失直达“搜索”蓝键。)*
  > **✅ 解决方案 (Solution):** 
  > ```xml
  > <input type="text" confirm-type="search" bindconfirm="onSearch" />
  > ```

- **[Profile] Unconstrained notification badge**
  **Problem:** High-digit numeric read badges dynamically shift adjacent UI flows inside unconstrained grids.
  *(大单位的未读红点数字过长易产生同行文字错位挤压。)*
  > **✅ 解决方案 (Solution):** 
  > ```css
  > .stat-badge {
  >   position: absolute;
  >   top: -10rpx; right: 20rpx;
  >   max-width: 60rpx;
  >   white-space: nowrap;
  > }
  > ```

- **[Homepage] Missing active touch feedback**
  **Problem:** Navigational transitions via primary UI cards exhibit no kinetic visual confirmation.
  *(卡片缺乏按压瞬时回馈，造成反应迟滞错觉。)*
  > **✅ 解决方案 (Solution):** 
  > ```xml
  > <view class="featured-card" hover-class="card-active" hover-start-time="20" hover-stay-time="70">...</view>
  > ```

- **[Listing Detail] Swiper event propagation**
  **Problem:** Tapping image gallery instances might propagate micro-drags to native elements.
  *(幻灯片看大图有时会导致后方长序列页面连带被误滑。)*
  > **✅ 解决方案 (Solution):** 
  > 若启用了自定义全屏遮罩图片，为其底层挂载 `catchtouchmove="true"` 参数阻隔气泡。

- **[My Listings] Low contrast on danger actions**
  **Problem:** Floating action calls display zero visual disparity.
  *(列表动作中的“删除”处于隐晦常规配色，无法唤醒风险认知且常被忽视。)*
  > **✅ 解决方案 (Solution):** 
  > ```css
  > .swipe-delete {
  >   background-color: #FA5151 !important; /* Native WeChat Alert Red */
  > }
  > ```
