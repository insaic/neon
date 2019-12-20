### Actionsheet - 行动按钮
---
#### 按需引入

```js
import { Actionsheet } from '@insaic/neon'
Vue.use(Actionsheet)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/actionsheet.vue)
```html
<sq-actionsheet
  v-model="isShowAction"
  :action-list="list"
  @on-item-click="action"
  :show-cancel-button="false"
/>
```
---
#### Props
 名称               | 类型       | 说明                | 默认值   | 可选值 
:-----------        |:--------- |:-------------------|:------- |:-------
 value              | `Boolean` | 绑定值,用于显示与否   |   --    |  -- 
 action-list        | `Array`   | 选项list,每项需含有name字段,具体数据格式参考demo  |    --   |  -- 
 show-cancel-button | `Boolean` | 是否显示`取消`选项    | `true `|  `false` 

---

#### Event
 名称       | 参数  | 描述             
:---------- |:---- |:------------------ 
 on-item-click | item | 点击选中的项执行事件,item为选中项