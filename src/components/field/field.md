### Field - 输入框

---
#### 按需引入

```js
import { Field, FieldGroup } from '@insaic/neon'
Vue.use(Field).use(FieldGroup)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/field.vue)
```html
<!-- 列表样式 -->
<sq-field placeholder="请输入用户名" v-model="name"></sq-field>
<!-- 间隔样式 -->
<sq-field-group>
  <sq-field label="用户名" placeholder="请输入用户名" v-model="name"></sq-field>
  <sq-field label="密码" placeholder="请输入密码" v-model="password"></sq-field>
</sq-field-group>
```
---
#### Props
- field

 名称            | 类型      | 说明                    | 默认值   | 可选值
:------         |:--------- |:---------------        |:------- |:-------
 value          | `Boolean` | 绑定值                  |   --     |  --
 is-link        | `Boolean` | 是否显示右边箭头          | false    |  --
 type           | `String`  | input的type             | text     | input类型
 label          | `String`  | 标题文本                 | --       |  --
 right          | `Boolean` | 是否将input文本居右显示   | false    |true
 ipt-style      | `Object`  | input的style           | --       |--
 input拥有的属性 | **        | 其他属性将作用于input上    | **       |**
 align          | `String`  | 控制内容显示的位置        | `left`     | `center`、`right`
 required       | `Boolean` | 是否显示必填的红星样式     | false    | true
 clearable      | `Boolean` | 是否显示清除内容的图标，<br>icon属性存在时会以`clearable`为准    | false    | true
 icon           | `String`  | 定义右侧icon图标，<br>`clearable`属性存在时会以`clearable`为准    | --       | --
 icon-color     | `String`  | icon图标颜色             | `inherit`       | --
 icon-size      | `String`  | icon图标大小             | `16`（px）     | --
 hasBlurTip     | `Boolean` | 是否在失去焦点后对内容进行非空验证并在输入框尾部显示警示图标，可搭配自定义指令 [v-sq-input](#/docs/directives/sq-input) 一同使用 | false     | true

---

#### Event
 名称           | 参数  | 描述             
:-----          |:---- |:------------------ 
input拥有的事件  | **   | 添加的事件将作用于input上
click-icon      | --   | 点击icon图标触发的事件，<br>`clearable`属性存在时不会触发该事件
