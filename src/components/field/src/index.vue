<template>
  <div class="sq-field">
    <div class="sq-field-label" v-if="label">
      <span class="sq-field-label-text" :class="labelClasses">{{label}}</span>
    </div>
    <div class="sq-field-value" :class="classes">
      <div class="sq-field-body">
        <input
          ref="inputRef"
          v-if="!$slots.control"
          class="sq-field-control"
          :class="inputClasses"
          :type="type"
          :value="value"
          :style="iptStyle"
          v-bind="$attrs"
          v-on="listeners"
        >
        <slot name="control"></slot>
        <div class="sq-field-icon" v-if="clearable || icon || arrow || isLink || innerHasBlurTip" :style="iconWrapperStyles" @click="$_clickIcon">
          <i class="sq-icon" :class="iconClasses" v-if="!$slots.icon || innerHasBlurTip" :style="iconStyles"></i>
          <slot name="icon"></slot>
        </div>
        <div class="sq-field-button" v-if="$slots.button">
          <slot name="button"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-field',

  inheritAttrs: false,

  props: {
    iptStyle: {
      type: Object
    },
    align: {
      type: String,
      default: 'left'
    },
    right: {
      type: Boolean,
      default: false
    },
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    arrow: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    value: null,
    required: {
      type: Boolean,
      default: false
    },
    icon: String,
    clearable: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: 'inherit'
    },
    iconSize: {
      type: String,
      default: '16'
    },
    hasBlurTip: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      innerHasBlurTip: false
    }
  },

  computed: {
    inputClasses () {
      return [ {'sq-field-right': this.right}, `sq-field-ipt-${this.align}` ]
    },
    iconClasses () {
      return [
        {
          'sq-icon-arrow-right': !this.clearable && (this.arrow || this.isLink),
          'sq-icon-error-full': this.clearable && (this.value || this.value === 0),
          'sq-icon-alert-full blur-tip': this.innerHasBlurTip
        },
        this.icon ? `sq-icon-${this.icon}` : ''
      ]
    },
    iconWrapperStyles () {
      return {
        'color': this.iconColor
      }
    },
    iconStyles () {
      return {
        'font-size': `${this.iconSize}px`
      }
    },
    labelClasses () {
      return {
        'sq-field-label-required': this.required
      }
    },
    classes () {
      return {
        'sq-field-textright': this.right
      }
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput
      }
    }
  },

  mounted () {
    if (this.hasBlurTip) {
      const oldFun = this.$refs.inputRef.onblur
      this.$refs.inputRef.onblur = () => {
        if (typeof oldFun === 'function') {
          oldFun() ? (this.innerHasBlurTip = false) : (this.innerHasBlurTip = true)
        } else {
          !this.value ? (this.innerHasBlurTip = true) : (this.innerHasBlurTip = false)
        }
      }
    }
  },

  beforeDestroy () {
    if (this.$refs.inputRef) {
      if (typeof this.$refs.inputRef.onblur === 'function') {
        this.$refs.inputRef.onblur = null
      }
      if (typeof this.$refs.inputRef.oninput === 'function') {
        this.$refs.inputRef.oninput = null
      }
    }
  },

  methods: {
    $_clickIcon () {
      if (this.clearable) {
        this.$emit('input', '')
      } else {
        this.$emit('click-icon')
      }
    },
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}

</script>
<style lang="scss">
$prefixCls: sq-field;

.#{$prefixCls} {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  border-radius: 0;
  color: #333;
  overflow: hidden;
  position: relative;
  padding: 0 16px;
  font-size: 14px;
  &-label {
    max-width: 84px;
    margin-right: 6px;
    box-sizing: border-box;
    flex: 1;
    // &-text {
    //   font-size: 14px;
    // }
    &-required {
      position: relative;
      &::after {
        content: '*';
        position: absolute;
        color: red;
        font-size: 20px;
        margin-top: 4px;
      }
    }
    &~.#{$prefixCls}-value {
      .#{$prefixCls}-control {
        padding-left: 0;
      }
      .#{$prefixCls}-ipt-left {
        text-align: left;
      }
      .#{$prefixCls}-ipt-center {
        text-align: center;
      }
      .#{$prefixCls}-ipt-right {
        text-align: right;
      }
      .#{$prefixCls}-right {
        text-align: right;
        // padding-right: 14px;
      }
    }
    &~.#{$prefixCls}-value.#{$prefixCls}-islink.#{$prefixCls}-textright {
      .#{$prefixCls}-right {
        padding-right: 28px;
      }
    }
  }
  &-value {
    flex: 1;
    position: relative;
    .#{$prefixCls}-control {
      outline: none;
    }
    .#{$prefixCls}-button {
      position: absolute;
      right: 12px;
      bottom: 8px;
      font-size: 14px;
      height: 34px;
      button {
        height: 100%;
        line-height: initial;
        vertical-align: top;
        padding: 0 14px;
        color: $theme-color;
        border-color: $theme-color;
        background-color: #F6F9FD;
      }
    }
  }
  &-body {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &-control {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    line-height: normal;
    border:0;
    margin: 0;
    padding: 14px 0px;
    background-color: transparent;
    resize: none;
    display: block;
  }
  &-icon {
    display: inline-block;
    padding: 0 10px;
    color: inherit;
    line-height: inherit;
    margin-right: -10px;
    .sq-icon-arrow-right, .sq-icon-error-full {
      color: #ccc;
    }
    .blur-tip {
      color: #ff6500
    }
  }
  &~&::after {
    content: '';
    position: absolute;
    top: 0;
    height: 200%;
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    left: 16px;
    right: 0;
    width: auto;
    transform: scale(1, .5);
    border: 0 solid #e5e5e5;
    border-top-width: 1px;
  }
}
</style>
