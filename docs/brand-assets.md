# 官方品牌图标来源

核验日期：2026-09-07。下列文件均直接下载自品牌官网、官方 CDN 或官方 GitHub 仓库，保留原始文件字节，没有仿画、换色或采用第三方图标库。

| 页面名称 | 本地文件（`public/brands/`） | 精确下载来源 | 官方出处与说明 |
| --- | --- | --- | --- |
| Next.js | `nextjs.png` | https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png | Vercel 官方 CDN，独立黑白 N 图标，180×180 PNG，透明背景；适合白底。 |
| ChatGPT | `chatgpt.svg` | https://cdn.oaistatic.com/assets/favicon-o20kmmos.svg | OpenAI 官方静态资源 CDN 的 ChatGPT 结形 favicon。可无限缩放的 SVG，viewBox 16×16，保留官方深浅色媒体查询。 |
| 腾讯 ima | `ima.svg` | https://static.ima.qq.com/ima/assets/chat/favicon.svg | https://ima.qq.com 首页 `link rel="icon"` 直接引用；彩色渐变官方图标，SVG viewBox 16×16。 |
| 微信小程序 | `wechat-miniprogram.svg` | https://res.wx.qq.com/mpres/htmledition/images/icon/login/mini_program_circle807bc3.svg | 微信公众平台注册选择页的小程序图标，紫色 `#6467F0`，SVG viewBox 32×32；并非微信聊天气泡图标。 |
| 腾讯云 | `tencent-cloud.png` | https://cloudcache.tencent-cloud.com/open_proj/proj_qcloud_v2/gateway/shareicons/cloud.png | https://cloud.tencent.com 官网 `og:image` / `thumbnail` 引用的独立蓝色云图标，300×300 PNG、白底。 |
| Figma | `figma.svg` | https://static.figma.com/app/icon/2/favicon.svg | https://www.figma.com 首页 `link rel="icon"` 直接引用；五色官方图标，SVG viewBox 64×64。 |
| React | `react.svg` | https://raw.githubusercontent.com/facebook/react/main/fixtures/dom/public/react-logo.svg | Facebook/React 官方仓库原件；青色原子标识，SVG viewBox 23×20.46348。 |
| Vue | `vue.svg` | https://vuejs.org/logo.svg | https://vuejs.org 首页 favicon；绿色 V 图标，SVG viewBox 128×128。 |
| TypeScript | `typescript.svg` | https://www.typescriptlang.org/branding/ts-logo-128.svg | TypeScript 官方品牌资源目录，蓝底白字 TS，SVG viewBox 128×128。另见 https://www.typescriptlang.org/branding/ 。 |
| Node.js | `nodejs.svg` | https://nodejs.org/static/logos/nodejsHex.svg | Node.js 官网品牌素材，独立绿色六边形 JS 图标，SVG viewBox 44×50。对应仓库 `nodejs/nodejs.org/apps/site/public/static/logos/nodejsHex.svg`。 |

## 微信小程序来源链

1. 官方注册页：https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN 。
2. 该页引用样式表：https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/register/account_type807bc3.css 。
3. 样式 `.mp_accounts_type_icon__mini_program` 直接指定上述 `mini_program_circle807bc3.svg`，页面对应文案为“小程序”。

## 使用约定

- 优先使用上表 10 个文件；`nextjs.ico` 是另存的官网 favicon 备用文件（https://nextjs.org/favicon.ico，最大 48×48），页面应使用更清晰的 `nextjs.png`。
- 容器统一白色、圆角并保留内边距，图片使用 `object-fit: contain`；不同标识自身长宽比与留白不同，必要时仅调整图片显示尺寸。
- 不使用 CSS `filter`、`mask` 或 `fill` 覆盖品牌原色。ChatGPT 的图片或父容器设置 `color-scheme: light`，令官方 SVG 在白底上稳定使用黑色标识。
- SVG favicon 仍是矢量，不受 16/32/64 viewBox 数字所代表的栅格分辨率限制；Next.js 180×180、腾讯云 300×300 的 PNG 足够用于本页小图标。
- 图标仅用于个人主页技术与工具识别；商标仍归各品牌所有，官方来源不等于授予任意商标使用权。

## 本地验收

- 10 项均下载成功，无缺失；备用 Next.js favicon 另存。
- 8 个 SVG 均可用标准 XML 解析；无脚本、事件属性、`foreignObject`、外部 `href` / `src`、CSS `@import` 或远程 `url()`。
- ima 的 SVG 含本地渐变、滤镜与 `url(#...)` 引用；ChatGPT 含官方颜色媒体查询；这些均保留且不依赖网络。
- PNG/ICO 可由图像解码器读取；已人工查看 Next.js 和腾讯云原图。


## SHA-256

| File | SHA-256 |
| --- | --- |
| `chatgpt.svg` | `a29919808335f2e28e40cd1eed2ca5f5dd6e9e24d177a775a4d73137e1d0e8fe` |
| `figma.svg` | `e6227b7dbc49c86da6f4ccfa02ba439428106b0ca627a0a33ea6ad1e09f335b3` |
| `ima.svg` | `79f5f565ad0d31c2b3a0f61f3647756abe43bb6a264c7b229f212734662bc1f8` |
| `nextjs.ico` | `c28fdd2a4f31e2dc64f653962286da5c82a4cdfc518b242d32812c624e9a19a4` |
| `nextjs.png` | `3d5717cc0b37f143a1c0aeb21c59c6dce2f26bb5417252d40d3f09671602dba1` |
| `nodejs.svg` | `e4c8de546b2462ad9497679c55609701144ffacd8e18ac17a7f7f7b795de9fe7` |
| `react.svg` | `671afde83899249e6c2883b0d1592fc00886d3c0620d20bcab566cd2caa97f1a` |
| `tencent-cloud.png` | `142c4efc8176134345f162257a8ae7fa62dfbeacd20244d7d2ff0525bb3e882a` |
| `typescript.svg` | `25e995fa85ae9ff6b5749f4ffeb21b2fe71d74e9b8d8db8eac4b9732cd9ef287` |
| `vue.svg` | `6f97b1f82a6dafdda0b53c347bdfb0b74cb3bf1d73ce8e40bbbb914115235886` |
| `wechat-miniprogram.svg` | `2706f895597a3df308b5a2abc5abe9222f7a8ec219a0bb04afadae2999544a60` |
