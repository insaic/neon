<template>
  <sq-popup
    v-model="isShow"
    :close-on-click-overlay="false"
    class="sq-sign-popup-wrap"
  >
    <div class="sq-sign-draw-wrap">
      <i class="sq-icon sq-icon-error-full sq-sign-close"
        @click="onClose"
      ></i>
      <canvas
        ref="canvasRef"
        class="sq-sign-canvas-wrap"
        @touchstart="onTouchstart"
        @touchmove="onTouchmove"
        @touchend="onTouchend"
        @touchcalcel="onTouchend"
      ></canvas>
    </div>
    <div class="sq-sign-btn-wrap">
      <sq-button
        type="primary"
        class="sq-sign-btn-left"
        size="small"
        @click.native="clearHandler"
      >{{ clearText }}</sq-button>
      <sq-button
        type="primary"
        size="small"
        @click.native="finishHandler"
      >{{ finishText }}</sq-button>
    </div>
  </sq-popup>
</template>

<script>
import SqPopup from '../../popup'

export default {
  name: 'sq-sign',

  components: {
    SqPopup
  },

  props: {
    value: {
      type: Boolean
    },
    clearText: {
      type: String,
      default: '清屏'
    },
    finishText: {
      type: String,
      default: '完成'
    }
  },

  watch: {
    value: {
      handler (val, oldVal) {
        this.isShow = val
      }
    }
  },

  data () {
    return {
      isShow: false,
      canvas: null,
      ctx: null,
      linex: [],
      liney: [],
      linen: [],
      lastX: 1,
      lastY: 30,
      isDrawing: false
    }
  },
  methods: {
    onClose () {
      this.$emit('input', false)
    },
    clearHandler () {
      this.rewrite()
    },
    finishHandler () {
      this.$emit('on-finish', this.convertCanvasToImage())
      this.$emit('input', false)
      this.rewrite()
    },
    rewrite () {
      this.linex = []
      this.liney = []
      this.linen = []
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    convertCanvasToImage () {
      const image = new Image()
      image.width = 100
      image.height = 50
      image.src = this.canvas.toDataURL('image/png')

      return {
        image: image,
        imageFile: this.dataURLtoFile(
          this.canvas.toDataURL('image/png'),
          `${new Date().getTime()}.png`
        )
      }
    },
    // 根据鼠标坐标获取绘图坐标
    getCanvasPos (canvas, event) {
      const rect = canvas.getBoundingClientRect()
      let x
      let y
      if (event.targetTouches) {
        x = event.targetTouches[0].clientX
        y = event.targetTouches[0].clientY
      } else {
        x = event.touches.clientX
        y = event.touches.clientY
      }
      return {
        x: (x - rect.left) * (canvas.width / rect.width),
        y: (y - rect.top) * (canvas.height / rect.height)
      }
    },
    onTouchstart (event) {
      const { x, y } = this.getCanvasPos(this.canvas, event)
      this.isDrawing = true
      this.linex.push(x)
      this.liney.push(y)
      this.linen.push(0)
      event.stopPropagation()
      event.preventDefault()
    },

    onTouchmove (event) {
      let { x, y } = this.getCanvasPos(this.canvas, event)

      // 判断是否处于按下状态
      if (this.isDrawing) {
        this.linex.push(x)
        this.liney.push(y)
        this.linen.push(1)
        this.ctx.save()
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
        this.ctx.translate(-this.ctx.canvas.width / 2, -this.ctx.canvas.height / 2)
        this.ctx.beginPath()
        this.ctx.lineWidth = 2
        for (let i = 1; i < this.linex.length; i++) {
          this.lastX = this.linex[i]
          this.lastY = this.liney[i]
          if (!this.linen[i]) {
            this.ctx.moveTo(this.lastX, this.lastY)
          } else {
            this.ctx.lineTo(this.lastX, this.lastY)
          }
        }
        this.ctx.shadowBlur = 10
        this.ctx.stroke()
        this.ctx.restore()
      }
    },
    onTouchend () {
      this.isDrawing = false
    }
  },

  mounted () {
    this.canvas = this.$refs.canvasRef
    this.ctx = this.canvas.getContext('2d')
  }
}
</script>

<style lang="scss">
.sq-sign {
  &-popup-wrap {
    .sq-popup-content {
      min-width: 90%;
      min-height: 200px;
      background-color: transparent;
    }
  }

  &-close {
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 24px;
    color: #00A0E9;
    z-index: 2;
    background-color: #fff;
    border-radius: 50%;
  }

  &-draw-wrap {
    background-color: #fff;
    position: relative;
  }
  &-canvas-wrap {
    width: 100%;
    height: 200px;
  }
  &-btn {
    &-wrap {
      text-align: center;
      margin-top: 20px;
    }
    &-left {
      margin-right: 40px;
    }
  }
}
</style>
