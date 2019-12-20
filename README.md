# A Mobile UI Components built on Vue

## Links
* [Document](https://insaic.github.io/neon)
* [Example](https://insaic.github.io/neon/examples)
---
国内站点访问
* [文档](https://insaic.gitee.io/neon)
* [示例](https://insaic.gitee.io/neon/examples)

#### 安装

NPM

```bash
npm i @insaic/neon -S
```

CDN

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/@insaic/neon/lib/style.min.css">

<!-- 引入组件 -->
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://unpkg.com/@insaic/neon/lib/index.min.js"></script>
```

#### 引入组件

#### 1.按需引入（推荐）

使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import#readme)，该插件是一款 babel 插件，它会在编译过程中将
```js
import { Button } from '@insaic/neon'
```
 的写法自动转换为按需引入的方式 
 ```js
const button = require('@insaic/neon/lib/button')
require('@insaic/neon/lib/button/style')
 ```

 ```bash
 # 安装 babel-plugin-import 插件
 npm i babel-plugin-import -D
 ```

 在`.babelrc`里添加插件配置
 ```js
 "plugins": [
  [
    "import",
    {
      "libraryName": "@insaic/neon",
      "style": true
    }
  ]
]
 ```

 安装和配置好插件后，即可使用
 ```js
 import { Style, Button } from '@insaic/neon'
 Vue.use(Style).use(Button)
 ```
 的方式引入需要的组件

> 注意： 按需引入组件 也需引入基础样式 
> ```js
> import { Style } from '@insaic/neon'
> Vue.use(Style)
> ```


#### 2.全局引入

```js
import Neon from '@insaic/neon'
Vue.use(Neon)
```

> 注意
> 全局引入已包含了基础样式

---

### 主题定制

#### 样式变量
`Neon`样式基于`Sass`开发，可通过全局和组件的样式变量对主题样式进行调整

完整的样式变量列表可以查看 [默认样式变量](https://github.com/insaic/neon/blob/dev/src/common/styles/variables.scss)

#### 变量覆盖
可以通过引入组件源码(`components`目录下)，并覆盖样式变量的方式来实现主题定制

- 首先安装如下依赖： `babel-plugin-import`  `sass-loader`  `node-sass`

- 在 `.babelrc` 添加如下配置
```js
// .babelrc
{
  "plugins": [
    ["import", {"libraryName": "@insaic/neon", "libraryDirectory": "src/components"}],
  ]
}
```

- 在 `vue.config.js` 添加如下配置 `（基于vue-cli 3.0情况下）`
```js
// vue.config.js
module.exports = {
  // ...
  // 将neon源码包里的js进行babel-loader转译
  transpileDependencies: [
    '@insaic'
  ],
  // 将neon源码包里的scss变量引入，实现自定义样式主题
  css: {
    loaderOptions: {
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/variables.scss";`
      }
    }
  }
  // ...
}
```

- 最后在 `src` 下新建 `variables.scss` 添加如下配置
```scss
// src/variables.scss
// 下面两项须确保引入，不可省略
@import '~@insaic/neon/src/common/styles/variables';
@import '~@insaic/neon/src/common/styles/mixins';

// 以下为自定义内容，覆盖样式变量
// $theme-color:red;
// $button-primary-background-color: $theme-color;
```
