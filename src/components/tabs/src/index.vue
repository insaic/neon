<template>
  <div class="sq-tabs-wrapper" :style="titleHeightStyles">
    <div class="sq-tabs-header" :style="headerWrapperStyles" ref="tabHeaderWrapper">
      <div class="sq-tabs-header-line" v-if="!hideLine && type === 'line'" :style="lineStyles"></div>
      <div
        class="sq-tabs-header-item"
        :class="{
          'sq-tabs-active-line': type === 'line' && currentActive === tab.name,
          'sq-tabs-active-block': type === 'block' && currentActive === tab.name
        }"
        @click="handleClick($event, index)"
        v-for="(tab, index) in tabList"
        :key="index"
        ref="tabItemTitleWrapperRef"
      >
        <span ref="title" class="sq-tabs-title">{{ tab.label }}</span>
      </div>
    </div>
    <div class="sq-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-tabs',

  props: {
    active: {
      type: [String, Number]
    },
    sticky: {
      type: Boolean,
      default: false
    },
    lineScale: {
      type: [String, Number],
      default: 1
    },
    titleHeight: {
      type: [String, Number],
      default: 48
    },
    fontSize: {
      type: [String, Number],
      default: 16
    },
    hideLine: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'line',
      validator (value) {
        return ['line', 'block'].indexOf(value) > -1
      }
    },
    autoActive: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    titleHeightStyles () {
      return { 'padding-top': `${this.titleHeight}px` }
    },
    headerWrapperStyles () {
      return { 'position': this.sticky ? 'fixed' : 'absolute', 'height': `${this.titleHeight}px`, 'font-size': `${this.fontSize}px` }
    },
    lineStyles () {
      return { 'transform': this.tleft, 'width': this.lineWidth, 'display': this.lineDisplay }
    }
  },

  data () {
    return {
      tleft: `translate(0, 0) scaleX(${this.lineScale})`,
      tabList: [],
      currentActive: this.active,
      lineWidth: '0',
      lineDisplay: 'none',
      index: 0
    }
  },

  methods: {
    handleClick (event, index) {
      const navName = this.tabList[index].name
      if (navName === this.currentActive) { return }

      this.autoActive && this.setActivePane(index)

      this.$emit('click', navName, index)
    },

    setActivePane (index) {
      this.index = index
      this.currentActive = this.tabList[index].name

      if (!this.hideLine && this.type === 'line') {
        const parentLeft = this.$refs.tabHeaderWrapper.getBoundingClientRect().left
        const targetLeft = this.$refs.tabItemTitleWrapperRef[index].getBoundingClientRect().left
        this.tleft = `translate(${targetLeft - parentLeft}px, 0) scaleX(${this.lineScale})`
      }
    },

    getPane () {
      return this.$children.filter(item => item.$options.name === 'sq-tabpane')
    },

    updateNav () {
      const children = this.getPane()
      if (children.length === this.tabList.length) { return }

      this.tabList = []
      children.forEach((pane, index) => {
        this.tabList.push({
          label: pane.label,
          name: pane.name
        })
      })

      !this.hideLine && this.type === 'line' && (this.lineWidth = (100 / this.tabList.length) + '%')
    },

    renderTitle (el, index) {
      this.$nextTick(() => {
        const title = this.$refs.title[index]
        title.parentNode.replaceChild(el, title)
      })
    },

    listenResize () {
      const parentLeft = this.$refs.tabHeaderWrapper.getBoundingClientRect().left
      const targetLeft = this.$refs.tabItemTitleWrapperRef[this.index].getBoundingClientRect().left
      this.tleft = `translate(${targetLeft - parentLeft}px, 0) scaleX(${this.lineScale})`
    }
  },

  mounted () {
    const currentActive = this.currentActive

    if (currentActive) {
      const length = this.tabList.length
      const width = this.$refs.tabHeaderWrapper.clientWidth

      this.tabList.forEach((item, index) => {
        if (currentActive === item.name) {
          this.index = index
          this.tleft = `translate(${index * (width / length)}px, 0) scaleX(${this.lineScale})`
          this.lineDisplay = 'block'
        }
      })
    }

    !this.hideLine && this.type === 'line' && window.addEventListener('resize', this.listenResize, false)
  },

  beforeDestroy () {
    !this.hideLine && this.type === 'line' && window.removeEventListener('resize', this.listenResize)
  }
}
</script>

<style lang="scss">
.sq-tabs {
  &-title {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  &-active-line {
    color: $theme-color;
  }
  &-active-block {
    color: #fff;
    background-color: $theme-color;
  }
  &-wrapper {
    position: relative;
    // padding-top: 48px;
  }
  &-header {
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    // height: 48px;
    text-align: center;
    font-size: 16px;
    overflow:hidden;
    color: #878787;
    background-color:#fff;
  }
  &-header-line {
    z-index: 1;
    left: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background-color: $theme-color;
    transition-duration: 0.2s;
  }
  &-header-item {
    flex:1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
