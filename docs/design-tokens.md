# Design Tokens

## Token Table

### Color - Brand

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#2563eb` | 主操作、链接、选中态和高优先级可点击元素使用该色。 |
| `--color-primary-bg` | `#eff6ff` | 主色的浅底面，用于筛选选中态、标签底和弱强调卡片。 |
| `--color-primary-dark` | `#1d4ed8` | 主按钮按下态、深色描边和强调标题使用该色。 |
| `--color-link` | `var(--color-primary)` | 所有文本链接统一走链接色，避免页面私有蓝色。 |

### Color - Semantic

| Token | Value | Usage |
|---|---|---|
| `--color-danger` | `#ef4444` | 错误文案、危险操作和失败状态使用该色。 |
| `--color-danger-bg` | `#fff1f0` | 错误卡片、删除按钮浅底和失败空态背景使用该色。 |
| `--color-success` | `#16a34a` | 成功提示、已完成态和正向状态标识使用该色。 |
| `--color-success-bg` | `#f0fdf4` | 成功徽标底、完成卡片底和正向弱强调区域使用该色。 |
| `--color-warning` | `#d97706` | 警示信息、待处理状态和提醒型文案使用该色。 |
| `--color-warning-bg` | `#fffbeb` | 警示标签底、提醒卡片底和注意事项容器使用该色。 |
| `--color-info` | `#1677ff` | 信息提示、辅助说明图标和信息态标签使用该色。 |
| `--color-info-bg` | `#eaf3ff` | 信息态徽标底和说明性浅色容器使用该色。 |

### Color - Neutral

| Token | Value | Usage |
|---|---|---|
| `--color-text-1` | `#1f1f1f` | 页面标题、房源主标题和主信息使用该色。 |
| `--color-text-2` | `#4b5563` | 正文、二级说明和大部分辅助内容使用该色。 |
| `--color-text-3` | `#9ca3af` | 占位符、弱提示、禁用文本和次级元信息使用该色。 |
| `--color-text-inverse` | `#ffffff` | 深色背景按钮、标签和浮层上的文字使用该色。 |
| `--color-border` | `#e5e7eb` | 默认分割线、输入框边线和卡片细边框使用该色。 |
| `--color-border-strong` | `#d1d5db` | 需要更强边界感的描边、虚线框和选区边界使用该色。 |
| `--color-background-page` | `#f5f5f7` | 页面最外层背景统一使用该色。 |
| `--color-background-card` | `#ffffff` | 卡片、弹层、输入框和底部操作栏底色使用该色。 |
| `--color-background-subtle` | `#f3f4f6` | 斑马底、弱 hover 底和轻量占位面使用该色。 |
| `--color-background-muted` | `#eef2f7` | 骨架底、弱装饰底和静态浅灰面使用该色。 |
| `--color-background-selected` | `#edf3ff` | 已选标签、激活卡片和品牌态弱背景使用该色。 |

### Color - Accent

| Token | Value | Usage |
|---|---|---|
| `--color-accent-green` | `#15803d` | 正向统计、环保类信息和绿色图标文字使用该色。 |
| `--color-accent-green-bg` | `#dcfce7` | 绿色统计卡、完成标签浅底和成功数据块使用该色。 |
| `--color-accent-purple` | `#7c3aed` | 装饰型紫色图标、功能入口徽标和专题卡强调使用该色。 |
| `--color-accent-purple-bg` | `#f5f3ff` | 紫色功能入口浅底和专题卡弱背景使用该色。 |
| `--color-accent-amber` | `#f59e0b` | 金额提醒、待处理重点和暖色图标强调使用该色。 |
| `--color-accent-amber-bg` | `#fef3c7` | 暖色标签底和提醒数据块浅底使用该色。 |
| `--color-accent-rose` | `#ef4444` | 装饰性红粉强调和高关注度小徽标使用该色。 |
| `--color-accent-rose-bg` | `#fdf2f8` | 红粉装饰卡、功能块浅底和弱提示底使用该色。 |
| `--color-accent-teal` | `#0f8d77` | 客服、帮助中心和稳重信息型强调使用该色。 |
| `--color-accent-teal-bg` | `#eff8f6` | 帮助中心卡片底和青绿色弱背景使用该色。 |
| `--color-price-highlight` | `#ff5a5f` | 首页和列表中的租金数字高亮使用该色。 |

### Typography

| Token | Value | Usage |
|---|---|---|
| `--font-2xl` | `40rpx` | 顶部大标题、品牌区主标题和极少数展示型文案使用。 |
| `--font-xl` | `36rpx` | 页面主标题、关键页头和大模块标题使用。 |
| `--font-lg` | `32rpx` | 常规一级标题和高优先级卡片标题使用。 |
| `--font-title-sm` | `30rpx` | 次级标题、操作区主文案和表单区强调标题使用。 |
| `--font-label` | `26rpx` | 字段标题、控件标签和中等强调文案使用。 |
| `--font-md` | `28rpx` | 正文、输入内容和主操作按钮文案使用。 |
| `--font-sm` | `24rpx` | 辅助正文、描述文本和普通说明使用。 |
| `--font-caption` | `22rpx` | 标签、元信息和次级按钮文本使用。 |
| `--font-xs` | `20rpx` | 时间戳、角标和紧凑说明文字使用。 |
| `--font-xxs` | `18rpx` | 极小标签、头像下说明和密集列表补充信息使用。 |
| `--weight-regular` | `400` | 普通正文和默认文本权重使用。 |
| `--weight-medium` | `500` | 需要轻度强调但不抢眼的标题和标签使用。 |
| `--weight-bold` | `600` | 标题、主按钮和关键数字强调使用。 |
| `--weight-heavy` | `700` | 展示型标题和少量超强强调数字使用。 |
| `--lh-tight` | `1.3` | 紧凑标题和一行半内的强强调文本使用。 |
| `--lh-snug` | `1.45` | 卡片标题和较短说明文案使用。 |
| `--lh-normal` | `1.6` | 大多数正文、提示文案和表单说明使用。 |
| `--lh-relaxed` | `1.7` | 较长说明段落和客服说明文本使用。 |
| `--lh-loose` | `1.8` | 帮助中心、规则说明和长段落阅读场景使用。 |

### Spacing

| Token | Value | Usage |
|---|---|---|
| `--space-3xs` | `6rpx` | 最小内边距、紧凑标签和微型角标使用。 |
| `--space-2xs` | `8rpx` | 小圆角控件、紧凑间距和细微分组使用。 |
| `--space-xs` | `12rpx` | 小组件间距、输入框左右留白和图标间距使用。 |
| `--space-sm` | `16rpx` | 常规控件内边距、小卡片留白和列表紧凑间隔使用。 |
| `--space-md` | `20rpx` | 标准内容块内边距和常规卡片元素间距使用。 |
| `--space-lg` | `24rpx` | 页面常规内容留白、区块内边距和标题间隔使用。 |
| `--space-xl` | `32rpx` | 模块级间距和较大的视觉分组间隔使用。 |
| `--space-2xl` | `40rpx` | 大标题区、首屏头部和强分组间距使用。 |
| `--space-3xl` | `48rpx` | 极少数重型布局、首屏视觉区和大模态内容边距使用。 |
| `--page-padding` | `24rpx` | 页面左右边距统一使用该值。 |
| `--card-padding` | `24rpx` | 卡片内容的默认内边距使用该值。 |
| `--section-gap` | `32rpx` | 模块与模块之间的标准垂直间距使用该值。 |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | `4rpx` | 小标签、紧凑状态块和最小描边元素使用。 |
| `--radius-sm` | `8rpx` | 输入框、小按钮、缩略图和常规浅卡片使用。 |
| `--radius-md` | `12rpx` | 中等卡片、筛选面板项和图片容器使用。 |
| `--radius-lg` | `20rpx` | 大按钮、大卡片和块级容器使用。 |
| `--radius-xl` | `24rpx` | 浮层卡片、资料面板和列表大卡片使用。 |
| `--radius-2xl` | `28rpx` | 首页大块卡片和强调型面板使用。 |
| `--radius-panel` | `36rpx` | 底部抽屉面板和大面积弹层容器使用。 |
| `--radius-pill` | `999rpx` | 胶囊按钮、徽标和状态标签使用。 |

### Motion

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `0.2s` | 按钮按压、卡片轻微高亮和骨架淡出使用。 |
| `--duration-normal` | `0.28s` | 页面切换、弹层进入和状态面板展开使用。 |
| `--easing-standard` | `ease` | 默认过渡曲线统一使用该值。 |

### Effects

| Token | Value | Usage |
|---|---|---|
| `--line-width-hairline` | `1rpx` | 超细分割线和列表项细边框使用。 |
| `--line-width-thin` | `2rpx` | 输入边框、标签描边和卡片边框使用。 |
| `--opacity-disabled` | `0.4` | 所有禁用态统一使用该透明度。 |
| `--shadow-card` | `0 12rpx 24rpx rgba(15, 23, 42, 0.06)` | 默认浮起卡片和弱悬浮块使用该阴影。 |
| `--shadow-card-soft` | `0 4rpx 16rpx rgba(0, 0, 0, 0.06)` | 首页推荐卡、列表卡和轻量内容块使用该阴影。 |
| `--shadow-float` | `0 16rpx 36rpx rgba(15, 41, 114, 0.12)` | 底部面板、浮层和更强悬浮态使用该阴影。 |
| `--shadow-focus` | `0 0 0 4rpx rgba(37, 99, 235, 0.22)` | 主色聚焦环和选中外描边阴影使用该效果。 |
| `--gradient-brand` | `linear-gradient(180deg, #2f64f5 0%, #1f4fd7 100%)` | 首页或我的页品牌头图和重型品牌区背景使用。 |
| `--gradient-panel` | `linear-gradient(180deg, #fbfcff 0%, #f4f7ff 100%)` | 抽屉、切换面板和浮层底面使用。 |
| `--gradient-card-active` | `linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%)` | 选中卡片和品牌态高亮卡片使用。 |

### Component-specific Tokens

| Token | Value | Usage |
|---|---|---|
| `--skeleton-base-color` | `#eef2f7` | 骨架屏底色统一使用该值。 |
| `--skeleton-highlight-color` | `#f7f8fb` | 骨架 shimmer 的高光条使用该值。 |
| `--toast-bg` | `rgba(17, 24, 39, 0.82)` | 全局 toast 和轻提示容器底色使用。 |
| `--toast-text` | `#ffffff` | toast 内文本统一使用该颜色。 |
| `--overlay-bg` | `rgba(11, 19, 43, 0.4)` | 模态遮罩、底部抽屉遮罩和全屏浮层遮罩使用。 |
| `--bottom-bar-height` | `112rpx` | 详情底栏和固定操作栏整体预留高度使用。 |
| `--control-height-sm` | `56rpx` | 小尺寸按钮、紧凑筛选项和标签按钮使用。 |
| `--control-height-md` | `76rpx` | 输入框、验证码按钮和中等控件高度使用。 |
| `--control-height-lg` | `84rpx` | 主操作按钮和页底大按钮高度使用。 |
| `--action-bar-button-height` | `80rpx` | 底部操作栏中的按钮高度使用。 |
| `--input-height` | `76rpx` | 表单输入框高度统一使用。 |
| `--button-height` | `84rpx` | 标准主按钮高度统一使用。 |
| `--fab-size` | `88rpx` | 浮动按钮和圆形主入口尺寸使用。 |
| `--avatar-size-md` | `80rpx` | 中等头像和横向头像列表尺寸使用。 |
| `--avatar-size-lg` | `92rpx` | 聊天列表或账户卡大头像尺寸使用。 |
| `--image-thumb-size` | `148rpx` | 房源缩略图和列表图片卡标准边长使用。 |
| `--image-upload-size` | `200rpx` | 发布页上传格和图片选择网格边长使用。 |

### Legacy Aliases

| Token | Value | Usage |
|---|---|---|
| `--color-primary-background` | `var(--color-primary-bg)` | 兼容旧命名中的主色浅底引用，Phase 3 替换后可删除。 |
| `--color-bg` | `var(--color-background-page)` | 兼容旧全局页面背景变量，避免现有文件立即失效。 |
| `--color-card` | `var(--color-background-card)` | 兼容旧卡片背景变量，Phase 3 完成后统一迁移。 |
| `--color-text-main` | `var(--color-text-1)` | 兼容旧主文本变量，后续统一改成 `--color-text-1`。 |
| `--color-text-secondary` | `var(--color-text-2)` | 兼容旧次文本变量，后续统一改成 `--color-text-2`。 |
| `--color-text-muted` | `var(--color-text-3)` | 兼容旧弱文本变量，后续统一改成 `--color-text-3`。 |
| `--font-title` | `var(--font-lg)` | 兼容旧标题字号变量，后续统一改成语义字号。 |
| `--font-body` | `var(--font-md)` | 兼容旧正文字号变量，后续统一改成语义字号。 |
| `--font-meta` | `var(--font-sm)` | 兼容旧辅助字号变量，后续统一改成语义字号。 |
| `--radius-card` | `var(--radius-sm)` | 兼容旧卡片圆角变量，后续统一改成语义圆角。 |
| `--radius-control` | `var(--radius-xs)` | 兼容旧控件圆角变量，后续统一改成语义圆角。 |

## DO / DON'T

| DO | DON'T | Why |
|---|---|---|
| `color: var(--color-text-1);` | `color: #1f1f1f;` | 主文本颜色必须走语义 token，避免页面各自维护深色值。 |
| `padding: var(--card-padding);` | `padding: 24rpx;` | 卡片内边距应统一引用卡片 token，便于全局批量调整。 |
| `border-radius: var(--radius-pill);` | `border-radius: 999rpx;` | 胶囊圆角需要统一走 token，避免不同页面出现近似但不一致的圆角。 |
| `transition: all var(--duration-fast) var(--easing-standard);` | `transition: all 0.2s ease;` | 动效时长和曲线必须可集中调整，不能散落在页面文件。 |
| `background: var(--color-danger-bg); color: var(--color-danger);` | `background: #fff1f0; color: #ef4444;` | 语义配色必须成对引用，避免错误态样式被拆散成多个私有值。 |

## Color Swatches

| Token | Hex value | Usage |
|---|---|---|
| `--color-primary` | `#2563eb` | 主操作、链接、选中态。 |
| `--color-primary-bg` | `#eff6ff` | 主色浅底面。 |
| `--color-primary-dark` | `#1d4ed8` | 主色按下态和深强调。 |
| `--color-danger` | `#ef4444` | 错误和危险操作。 |
| `--color-danger-bg` | `#fff1f0` | 错误浅底和删除浅底。 |
| `--color-success` | `#16a34a` | 成功和已完成态。 |
| `--color-success-bg` | `#f0fdf4` | 成功浅底和正向卡片。 |
| `--color-warning` | `#d97706` | 警示和待处理状态。 |
| `--color-warning-bg` | `#fffbeb` | 警示浅底和提醒面。 |
| `--color-info` | `#1677ff` | 信息提示和说明态。 |
| `--color-info-bg` | `#eaf3ff` | 信息态浅底。 |
| `--color-text-1` | `#1f1f1f` | 一级文本。 |
| `--color-text-2` | `#4b5563` | 二级文本。 |
| `--color-text-3` | `#9ca3af` | 三级文本和占位符。 |
| `--color-text-inverse` | `#ffffff` | 反色文本。 |
| `--color-border` | `#e5e7eb` | 默认边线。 |
| `--color-border-strong` | `#d1d5db` | 强边线。 |
| `--color-background-page` | `#f5f5f7` | 页面背景。 |
| `--color-background-card` | `#ffffff` | 卡片和表单底。 |
| `--color-background-subtle` | `#f3f4f6` | 微弱背景。 |
| `--color-background-muted` | `#eef2f7` | 静态浅灰背景。 |
| `--color-background-selected` | `#edf3ff` | 选中浅底。 |
| `--color-accent-green` | `#15803d` | 绿色装饰强调。 |
| `--color-accent-green-bg` | `#dcfce7` | 绿色装饰浅底。 |
| `--color-accent-purple` | `#7c3aed` | 紫色装饰强调。 |
| `--color-accent-purple-bg` | `#f5f3ff` | 紫色装饰浅底。 |
| `--color-accent-amber` | `#f59e0b` | 琥珀色装饰强调。 |
| `--color-accent-amber-bg` | `#fef3c7` | 琥珀色装饰浅底。 |
| `--color-accent-rose` | `#ef4444` | 红粉色装饰强调。 |
| `--color-accent-rose-bg` | `#fdf2f8` | 红粉色装饰浅底。 |
| `--color-accent-teal` | `#0f8d77` | 青绿色装饰强调。 |
| `--color-accent-teal-bg` | `#eff8f6` | 青绿色装饰浅底。 |
| `--color-price-highlight` | `#ff5a5f` | 房源租金高亮色。 |
| `--skeleton-base-color` | `#eef2f7` | 骨架底色。 |
| `--skeleton-highlight-color` | `#f7f8fb` | 骨架高光色。 |
| `--toast-text` | `#ffffff` | toast 文字色。 |
