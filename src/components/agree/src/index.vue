<template>
  <div class="sq-agree" @click.stop="$_Click">
    <div class="sq-agree-wrap">
      <sq-checkicon :value="value" :type="borderType" @check.stop="$_Click"></sq-checkicon>
      <span class="sq-agree-text">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import SqCheckicon from '../../checkicon/src'

export default {
  name: 'sq-agree',

  components: {
    SqCheckicon
  },

  props: {
    borderType: {
      type: String,
      default: 'round', // 默认圆形，可设置正方形
      validator (value) {
        return ['round', 'square', 'square-border'].indexOf(value) > -1
      }
    },
    value: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    $_Click (event) {
      this.$emit('input', !this.value)
    }
  }
}

</script>
<style lang="scss">
$prefixCls: sq-agree;

.#{$prefixCls} {
  display: inline-block;
  font-size: 14px;
  a {
    color: $theme-color;
  }
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-text {
    display: inline-block;
    margin-left: 6px;
    flex: 1 1 0%;
    text-align: left;
  }
}
</style>
