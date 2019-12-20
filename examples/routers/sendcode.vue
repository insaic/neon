<template>
  <div>
    <demo-title left>基础形式</demo-title>
    {{ code }}
    <sq-sendcode
      v-model="sendcode1"
      :code.sync="code"
      session-storage-key="sessionStorageKey"
      @click="send1"
    />

    <demo-title left>嵌入fieldgroup形式,自定义输入规则</demo-title>
    <sq-field-group>
      <sq-field label="手机号码" placeholder="请输入手机号码" v-model="name"></sq-field>
      <sq-sendcode
        v-model="sendcode2"
        @click="send2"
        :code.sync="code2"
        :replace-handle="replaceHandle"
        pattern="*"
        :maxlength="64"
      />
    </sq-field-group>
    {{ code2 }}
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      sendcode1: false,
      sendcode2: false,
      name: '',
      code: '',
      code2: ''
    }
  },

  methods: {
    send1 () {
      this.sendcode1 = true
    },
    send2 () {
      this.sendcode2 = true
    },
    replaceHandle (val) {
      return val.replace(/[^a-zA-Z0-9]/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
