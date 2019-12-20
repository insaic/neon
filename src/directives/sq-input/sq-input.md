### sq-input 指令
在field组件里，有时我们需要对用户输入内容进行处理（如在输入邮箱时对不满足邮箱正则表达式的内容进行置空处理），这时，我们会对field组件绑定onInput事件，后在事件里编写逻辑代码，或者在field组件失去焦点时，提示用户需要输入内容，这系列操作的代码提取便形成了 `v-sq-input` 指令，对 mobile、idNo、email、address、vin、engineNo 进行的对应的处理，默认情况下，指令包含了`required`下也会在输入框失去焦点时进行失焦提示

---
### 使用
---
#### 注册全局指令

```js
import { sqInput } from '@insaic/neon/src/directives'

Vue.use(sqInput)
```
#### 注册局部指令

```js
import { sqInput } from '@insaic/neon/src/directives'

export default {
  directives: {
    sqInput
  }
}
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/field.vue)
```html
<!-- 指令 arg 为 mobile 情况下 -->
<sq-field
  placeholder="请输入手机号码"
  v-model="mpbile"
  hasBlurTip
  v-sq-input:mobile.required
/>

<!-- 指令 arg 为 idNo 情况下 -->
<!-- 证件类型 证件号码 -->
<sq-field
  label="证件类型"
  placeholder="请选择证件类型"
  :value="insured.certificateType | config('certificate')"
  required
  is-link
  readonly
  @click="clickCertificateType('insured', 'isInsuredTeam')"
/>
<sq-field
  v-sq-input:idNo.required="insured.certificateNo"
  correlation="insured.certificateType"
  label="证件号码"
  placeholder="请输入证件号码"
  v-model="insured.certificateNo"
  required
/>

<!-- 指令 arg 为 email 情况下 -->
<sq-field
  v-sq-input:email="insured.email"
  label="邮箱"
  placeholder="请输入邮箱"
  v-model="insured.email"
/>

<!-- 指令 arg 为 address 情况下 -->
<sq-address
  v-sq-input:address.required
  label="地址"
  placeholder="地址长度为5-100个字符"
  v-model="insured.address"
  required
/>

<!-- 指令 arg 为 vin 情况下 -->
<sq-field
  v-sq-input:vin.required="result.vin"
  label="车架号"
  v-model="result.vin"
  placeholder="请输入车架号"
  required
/>

<!-- 指令 arg 为 engineNo 情况下 -->
<sq-field
  v-sq-input:engineNo.required="result.engineNo"
  label="发动机号"
  v-model="result.engineNo"
  placeholder="请输入发动机号"
  required
/>
```

---
 arg值 | 说明    
:-------- |:---------
 mobile   | 验证手机号码
 idNo     | 验证证件号码，需设置 `correlation` 属性，其值为所对应的证件类型（`ID_CARD`、`PASSPORT`、`ORG_CODE`、`BUSINESS_LICENSE`）
 email    | 验证邮箱   
 address  | 验证地址   
 vin      | 验证车架号/vin码  
 engineNo | 验证发动机号码
 other      | 默认情况下，指令包含了`required`下也会在输入框失去焦点时进行失焦提示      

---
 modifiers可选值 | 说明         | 默认值    |   可选值      
:--------       |:---------    |:-------  |:------
 required       | 验证是否必填   | --       | --

:::tip 注意
指令arg参数为 `mobile`、`idNo`、`email` 时需传入所对应的 `expression`

在含v-sq-input代码块中 请勿使用v-if，用v-show代替，否则会引起bug
:::

