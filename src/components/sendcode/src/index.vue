<template>
  <div class="sq-sendcode">
    <div class="sq-sendcode-input-wrapper">
      <input
        :type="type"
        :value="inputValue"
        @input="onInput"
        :pattern="pattern"
        class="sq-sendcode-input"
        :maxlength="maxlength"
        :placeholder="placeholder"
      >
    </div>
    <sq-button
      class="sq-sendcode-btn"
      :class="{ 'sq-sendcode-disabled-btn': this.disabled }"
      type="ghost"
      :disabled="disabled"
      @click="$_click"
      :style="styles">
      {{ text }}
    </sq-button>
  </div>
</template>

<script>
import SqButton from '../../button/src'

export default {
  name: 'sq-sendcode',

  components: {
    SqButton
  },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 6
    },
    placeholder: {
      type: String,
      default: '请输入短信验证码'
    },
    buttonInitText: {
      type: String,
      default: '获取验证码'
    },
    timing: {
      default: 60,
      validator (val) {
        return /^\d*$/.test(val)
      }
    },
    code: {
      type: [String, Number]
    },
    sessionStorageKey: {
      type: String
    },
    pattern: {
      default: '[0-9]*'
    },
    replaceHandle: {
      type: Function
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    styles () {
      return {
        'backgroundColor': this.disabled ? '#ccc' : '',
        'opacity': 1
      }
    },
    text () {
      return this.disabled ? this.runTime + '秒后重试' : this.buttonInitText
    }
  },

  data () {
    return {
      disabled: false,
      status: 'init',
      runTime: this.timing,
      timerObj: null,
      inputValue: this.code
    }
  },

  methods: {
    onInput (event) {
      if (this.replaceHandle) {
        event.target.value = this.inputValue = this.replaceHandle(event.target.value)
      } else {
        this.inputValue = event.target.value
      }
    },
    $_click () {
      this.$emit('click')
    },
    run () {
      this.disabled = true
      if (this.sessionStorageKey) {
        window.sessionStorage[this.sessionStorageKey] = new Date().getTime() + this.runTime * 1000
      }
      this.timerObj = setInterval(() => {
        if (this.runTime <= 1) {
          this.timeInit()
        }
        --this.runTime
      }, 1000)
    },
    timeInit () {
      clearInterval(this.timerObj)
      this.disabled = false
      this.$emit('input', false)
      if (this.runTime !== this.timing) {
        this.runTime = this.timing
      }
    }
  },

  watch: {
    value (val, oldVal) {
      val ? this.run() : this.timeInit()
    },
    inputValue (val, oldVal) {
      this.$emit('update:code', val)
    }
  },

  created () {
    const oldTime = ~~((window.sessionStorage[this.sessionStorageKey] - new Date().getTime()) / 1000)
    if (oldTime > 0 && this.sessionStorageKey) {
      this.$emit('input', true)
      this.runTime = oldTime
    }
  },

  beforeDestroy () {
    !this.sessionStorageKey && clearInterval(this.timerObj)
  }
}
</script>

<style lang="scss">
$prefixCls: sq-sendcode;

.#{$prefixCls} {
  height: 48px;
  line-height: 48px;
  position: relative;
  &-input-wrapper {
    height: 100%;
    line-height: 100%;
    display: inline-block;
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    right: 130px;
    left: 0;
    border-radius: 4px;
    overflow: hidden;
  }
  &-input {
    display: inline-block;
    border: 0;
    height: 100%;
    width: 100%;
    padding-left: 12px;
    box-sizing: border-box;
    font-size: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
    &:focus {
      outline: 0;
    }
  }
  & {
    #{&}-btn {
      position: absolute;
      right: 0;
      padding: 0 18px;
      &.sq-sendcode-disabled-btn {
        border-color: transparent;
        color: #fff;
      }
    }
  }
}
</style>
