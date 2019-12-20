<template>
  <div class="demo-page-wrap demo-field-wrap">
    <demo-title left>列表样式</demo-title>
    <sq-field placeholder="请输入手机号码" v-model="name" hasBlurTip v-sq-input:mobile.required></sq-field>
    <sq-field required label="用户名" placeholder="请输入用户名" v-model="name" icon="alert-full" @click-icon="clickIcon"></sq-field>
    <sq-field required label="带清空按钮" placeholder="请输入密码" clearable v-model="name2"></sq-field>

    <demo-title left>间隔样式</demo-title>
    <sq-field-group>
      <sq-field placeholder="请输入用户名" v-model="name"></sq-field>
      <sq-field label="用户名" placeholder="文本居右" right v-model="name"></sq-field>
      <sq-field required label="带清空按钮" placeholder="请输入密码" clearable v-model.number="name2"></sq-field>
    </sq-field-group>

  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      name: '',
      name2: 0,
    }
  },

  methods: {
    clickIcon () {
      alert('clickIcon')
    }
  }
}

</script>
<style lang='scss'>
.demo-field-wrap {
  padding: 0;
}
</style>
