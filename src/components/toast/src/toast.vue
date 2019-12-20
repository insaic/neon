<template>
  <transition name="sq-toast">
    <div class="sq-toast-wrapper" v-show="visible">
      <div class="sq-toast">
        <div class="sq-toast-mark" v-show="isShowMark"></div>
        <div class="sq-toast-content" :class="contentClasses">
          <i :class="classes" :style="{ fontSize: iconSize + 'px' }"></i>
          <div class="sq-toast-text" v-show="message" :style="{ fontSize: textSize + 'px'}">{{ message }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sq-toast',

  props: {
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return ['text', 'success', 'error', 'loading', 'warn'].indexOf(value) > -1
      }
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconSize: {
      type: [Number, String],
      default: 44
    },
    iconClass: {
      type: String,
      default: ''
    },
    textSize: {
      type: [Number, String],
      default: 14
    }
  },

  computed: {
    isShowMark () {
      return this.type === 'loading'
    },
    classes () {
      return [
        {
          [`sq-toast-icon sq-icon sq-icon-checkmark`]: this.type === 'success',
          [`sq-toast-icon sq-icon sq-icon-error`]: this.type === 'error',
          [`sq-toast-icon sq-icon sq-icon-animation-loading sq-icon-loading`]: this.type === 'loading',
          [`sq-toast-icon sq-icon sq-icon-alert-empty`]: this.type === 'warn'
        },
        this.iconClass ? `sq-toast-icon sq-icon sq-icon-${this.iconClass}` : ''
      ]
    },
    contentClasses () {
      return {
        'sq-toast-type': this.type === 'text' && !this.iconClass,
        'sq-toast-bottom': this.position === 'bottom',
        'sq-toast-min-width': this.message !== void 0 && this.message !== ''
      }
    }
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {}
}
</script>

<style lang="scss">
/*依赖 base 里的动画*/

.sq-toast-enter-active, .sq-toast-leave-active {
  transition: opacity .5s;
}
.sq-toast-enter, .sq-toast-leave-to{
  opacity: 0;
}
.sq-toast-wrapper {
  z-index: 11000;
}
.sq-toast-mark {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
}
.sq-toast-content.sq-toast-type {
  max-width: initial;
  min-width: initial;
}
.sq-toast-content.sq-toast-bottom {
  top: initial;
  bottom: 100px;
}
.sq-toast-min-width {
  min-width: 120px;
}
.sq-toast-content {
  z-index: 11000;
  max-width: 140px;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  color: #fff;
  font-size: 15px;
  line-height: 1.2;
  border-radius: 5px;
  word-break: break-all;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(0, 0, 0, .7);
  padding: 12px;
  text-align: center;
  .sq-toast-icon {
    font-size: 44px;
    line-height: 1;
    &.sq-icon-loading {
      font-size: 32px;
    }
  }
}
.sq-toast-icon ~ .sq-toast-text {
  margin-top: 12px;
}
</style>
