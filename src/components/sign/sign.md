### Sign - 签名

---
#### 按需引入

```js
import { Sign } from '@insaic/neon'
Vue.use(Sign)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/sign.vue)
```html
<!-- 用法 -->
<sq-sign
  v-model="isShowSign"
  @on-finish="finishHandler"
/>
```

#### Props
| 名称            | 类型      | 说明            | 默认值  | 可选值 |
|:---------------|:--------- |:---------------|:-------|:------|
| value          | `Boolean` | 是否显示签名弹层  | false  | true  |
| clearText      | `String`  | 左侧按钮文字     | 清屏    |       |
| finishText     | `String`  | 右侧按钮文字     | 完成    |       |

---
#### Event
| 名称       | 参数                 | 描述                 |
|:--------  |:------------         |:----                |
| on-finish | { image, imageFile } | image类型 和 file类型 |