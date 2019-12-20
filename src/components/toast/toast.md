### Toast - 轻提示
---
#### 按需引入

```js
import { Toast } from '@insaic/neon'
Vue.use(Toast)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/toast.vue)
```js
// text形式使用
this.$toast.text('请输入证件号码', 2000)
// success形式使用
this.$toast.success('操作成功')
// error形式使用
this.$toast.error('操作无效')
// error形式使用
this.$toast.warn('操作警告')
// loading形式使用
this.$toast.loading('加载中...', -1)
// 手动隐藏
this.$toast.hide()
// 自定义icon
this.$toast.show({ message: '自定义icon', iconClass: 'pentagram' })
```
---
#### Event
| 名称 | 参数 | 描述 |
|:---- |:--- |:---- |
| text<br>success<br>error<br>warn<br>loading | text,<br>time,<br>position 或 `Object`类型 | **参数一：** 显示的文案<br>**参数二：** 显示时间，默认3000ms，time为-1时不消失，需手动调用hide方法隐藏<br> **参数三：** <br>1. 当参数为`String`类型时表示显示的位置，默认 `middle` ，还可设置为 `bottom` 则位于底部显示 <br>2. 为`Object`时，可设置<br>`iconSize`：类型为`Number` `String` (默认44)<br> `iconClass`：类型为`String` (默认--)<br> `textSize`：类型为`Number` `String` (默认14)|
| hide | -- | 隐藏toast，一般配合loading使用 |

:::tip
text、success、error、warn、loading均为show方法里的type参数的简写形式。亦可用show方法传入对象形式使用。
:::

#### 多例形式使用
:::tip
toast默认为单例。多例调用配置如下
```js
Vue.use(toast, {
  isMultiple: true
})
```
:::

#### 不挂载在vue原型上，自己手动挂载并调用toast例子。
:::tip
toast默认为挂载在vue原型上。自己手动挂载并调用toast例子，如下
```js
// 配置
Vue.use(toast, {
  isInPrototype: false
})
// 手动挂载toast
window.$toast = toast
// 使用
const _loading = window.$toast.loading('加载中...', -1)
// 隐藏
_loading.hide()
```
:::
