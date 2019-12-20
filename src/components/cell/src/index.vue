<template>
  <div class="sq-cell" :class="classes">
    <div
      class="sq-cell-head"
      v-if="title !== void 0 && title !== null || $slots.title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      class="sq-cell-bd"
      @click="$_click"
    >
      <slot>
        {{ value }}
      </slot>
    </div>
    <slot name="right-icon">
      <div class="sq-cell-ft" v-if="isLink">
        <i class="sq-icon sq-icon-arrow-right sq-cell-arrow"></i>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'sq-cell',

  props: {
    value: {
      type: String
    },
    title: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return [
        {
          'sq-cell-islink': this.isLink
        }
      ]
    }
  },

  methods: {
    $_click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
$prefixCls: sq-cell;

.#{$prefixCls} {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 24px;
  background-color: #fff;
  padding: 12px 16px;
  font-size: 14px;
  & ~ & {
    @include mix-1px($top: 1);
  }
  &-head {
    margin-right: 4px;
  }
  &-bd {
    @include mix-text-overflow;
    flex: 1;
    display: flex;
    align-items: center;
    flex-flow: row-reverse;
  }
  &-ft {
    padding-left: 16px;
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    position: relative;
  }
  &-arrow {
    font-size: 16px;
    color: #ccc;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
