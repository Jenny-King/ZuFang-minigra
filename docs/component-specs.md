# Component Specs

## Inventory

| Name | Path | Props | Events |
|---|---|---|---|
| Skeleton | `components/skeleton/` | `type`, `count` | 无 |
| Empty | `components/empty/` | `icon`, `title`, `subtitle`, `btn-text`, `btn-type` | `btntap` |
| Steps | `components/steps/` | `steps`, `current` | 无 |
| Lazy Image | `components/lazy-image/` | `src`, `mode`, `radius`, `height` | `load`, `error` |
| Toast Utility | `utils/toast.js` | `success(msg)`, `error(msg)`, `info(msg)`, `loading(msg)` | 无 |

## Skeleton

### Usage

```xml
<skeleton type="card" count="{{3}}" />
<skeleton type="list-item" count="{{5}}" />
<skeleton type="detail" />
<skeleton type="profile" />
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `String` | `"card"` | 控制骨架布局，支持 `card`、`list-item`、`detail`、`profile`。 |
| `count` | `Number` | `1` | 列表型骨架的重复数量，小于 `1` 时自动回退为 `1`。 |

### States

| State | Description |
|---|---|
| `card` | 上方 340rpx 图片占位，下方两条文本骨架，适合首页房源卡片。 |
| `list-item` | 左侧方形缩略图，右侧三条文本骨架，适合消息列表或横向列表。 |
| `detail` | 大图骨架 + 标题行 + 两条正文行 + 标签行，适合房源详情首屏。 |
| `profile` | 圆形头像 + 两条文本骨架，适合个人页卡片或账户切换入口。 |
| `reduced-motion` | 检测到减少动态偏好时保留静态骨架底，不执行 shimmer。 |

## Empty

### Usage

```xml
<empty
  title="暂无房源"
  subtitle="换个条件试试"
  btn-text="重置筛选"
  btn-type="primary"
  bindbtntap="handleReset"
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `String` | `""` | 自定义空状态图片路径；为空时使用内置几何插画。 |
| `title` | `String` | `""` | 必填标题，建议不超过 10 个中文字符。 |
| `subtitle` | `String` | `""` | 选填副标题，建议不超过 20 个字符。 |
| `btn-text` | `String` | `""` | 按钮文案；为空时不显示按钮。 |
| `btn-type` | `String` | `"ghost"` | 按钮类型，支持 `primary` 和 `ghost`。 |

### Events

| Event | Description |
|---|---|
| `btntap` | 点击按钮时触发，用于重试、重置、返回等空态 CTA。 |

### States

| State | Description |
|---|---|
| `default` | 居中显示图形、标题和副标题，无操作按钮。 |
| `with-button` | 在副标题下方额外展示按钮，按钮与文案间距固定为 `32rpx`。 |
| `custom-icon` | 使用外部图片路径替换默认插画。 |
| `ghost-action` | 按钮使用描边幽灵样式，适合弱操作。 |
| `primary-action` | 按钮使用主色实底样式，适合强引导。 |

## Steps

### Usage

```xml
<steps
  steps="{{['基础信息', '房源图片', '租金入住']}}"
  current="{{1}}"
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `Array` | `[]` | 步骤文案数组，空字符串会被过滤。 |
| `current` | `Number` | `0` | 当前步骤，`0` 开始计数，超出范围时自动夹紧。 |

### States

| State | Description |
|---|---|
| `completed` | 节点为主色实底圆，显示对勾，标签为 `text-1`。 |
| `current` | 节点为主色实底圆，显示步骤数字，标签为主色。 |
| `pending` | 节点为描边圆，显示步骤数字，标签为 `text-3`。 |
| `connector-completed` | 当前节点之前的连接线填充主色。 |
| `connector-pending` | 当前节点之后的连接线保留边框色。 |

## Lazy Image

### Usage

```xml
<lazy-image
  src="{{house.cover}}"
  mode="aspectFill"
  radius="var(--radius-lg)"
  height="340rpx"
  bindload="handleImageLoad"
  binderror="handleImageError"
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `String` | `""` | 图片地址；为空时直接显示错误占位。 |
| `mode` | `String` | `"aspectFill"` | 原生 `<image>` 的展示模式。 |
| `radius` | `String` | `"var(--radius-md)"` | 圆角值，会映射到组件内置半径类。 |
| `height` | `String` | `"340rpx"` | 高度值，会映射到组件内置高度类。 |

### Supported radius values

| Value |
|---|
| `4rpx` |
| `8rpx` |
| `12rpx` |
| `20rpx` |
| `24rpx` |
| `28rpx` |
| `36rpx` |
| `999rpx` |
| `var(--radius-xs)` |
| `var(--radius-sm)` |
| `var(--radius-md)` |
| `var(--radius-lg)` |
| `var(--radius-xl)` |
| `var(--radius-2xl)` |
| `var(--radius-panel)` |
| `var(--radius-pill)` |

### Supported height values

| Value |
|---|
| `140rpx` |
| `148rpx` |
| `160rpx` |
| `180rpx` |
| `200rpx` |
| `220rpx` |
| `260rpx` |
| `308rpx` |
| `340rpx` |
| `440rpx` |

### Events

| Event | Description |
|---|---|
| `load` | 图片加载完成后触发。 |
| `error` | 图片加载失败后触发。 |

### States

| State | Description |
|---|---|
| `loading` | 显示整块骨架占位，图片透明度为 `0`。 |
| `loaded` | 图片加载完成后淡入显示。 |
| `error` | 显示破图占位，不展示图片内容。 |
| `empty-src` | `src` 为空时直接进入占位态。 |
| `reduced-motion` | 在减少动态偏好下关闭骨架动画与淡入过渡。 |

## Toast Utility

### Usage

```js
const toast = require("../../utils/toast");

toast.success("发布成功");
toast.info("已为你更新");
toast.error("操作失败，请重试");

const loadingTask = toast.loading("提交中");
// 异步完成后
toast.hide();
await loadingTask;
```

### API

| Method | Return | Description |
|---|---|---|
| `toast.success(msg)` | `Promise<void>` | 使用原生成功态 toast，持续 `1.5s`。 |
| `toast.error(msg)` | `Promise<void>` | 优先调用页面内 `#app-toast` 或 `.app-toast-host` 的自定义错误视图；找不到宿主时回退到 `icon: 'none'`。 |
| `toast.info(msg)` | `Promise<void>` | 使用无图标原生 toast，持续 `1.5s`。 |
| `toast.loading(msg)` | `Promise<void>` | 使用 `wx.showLoading`，需显式调用 `toast.hide()` 结束。 |
| `toast.hide()` | `Promise<void>` | 关闭当前 toast 或 loading，并解析等待中的 Promise。 |

### States

| State | Description |
|---|---|
| `success` | 成功反馈，适合保存、发送、发布完成。 |
| `info` | 中性反馈，适合刷新、同步完成等提示。 |
| `error` | 错误反馈，优先走页面级红底自定义 toast 宿主。 |
| `loading` | 阻塞式处理中状态，需要手动结束。 |
| `hidden` | 调用 `hide()` 后清理当前显示状态。 |

## How To Add A New Component

| Step | Guide |
|---|---|
| 1 | 在 `components/<name>/` 下创建 `index.wxml`、`index.wxss`、`index.js`、`index.json` 四个文件，并在 `index.wxss` 顶部 `@import "../../styles/variables.wxss";`。 |
| 2 | 先在 `docs/ui-states.md` 中确认该组件的状态，再把所有视觉决策映射到现有 token，禁止新增硬编码颜色。 |
| 3 | 所有文案通过 props 传入，组件内部不要写死中文；需要交互时统一用 `Component()` 和 `triggerEvent()` 暴露事件。 |
| 4 | 不要在 `.wxml` 里写 inline style；如果组件需要尺寸或圆角变体，优先走类名映射或预设枚举。 |
| 5 | 完成后补充 `docs/component-specs.md`：更新 inventory、usage、props、events 和 state 描述，确保后续页面接入时不需要猜行为。 |
