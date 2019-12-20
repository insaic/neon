### Agree - 勾选按钮
---
#### 按需引入

```js
import { Agree } from '@insaic/neon'
Vue.use(Agree)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/agree.vue)
```html
<sq-agree v-model="isAgree">
  我已阅读并接受
  <a @click.stop="click">《保险须知》</a>中的条例
</sq-agree>
```
---

#### Props
 参数           | 类型       | 说明       | 默认值 | 可选值
:--------------|:---------- |:---------- |:----- |:---
 value         | `Boolean`  | 绑定值      |  --    | --
 borderType    | `String`  | 设置勾选按钮样式，默认圆形，可设置正方形 | `round` | `square`， `square-border`  