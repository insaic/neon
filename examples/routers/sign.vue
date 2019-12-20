<template>
  <div class="demo-page-wrap">
    <section class="bottom">
      <div
        class="bottom-sign-wrap"
        :class="signImgUrl ? 'border-solid' : ''"
        @click="isShowPopup = !isShowPopup"
      >
        <img
          :src="signImgUrl"
          alt=""
          v-if="signImgUrl"
          class="bottom-img"
        >
        <span v-else class="bottom-text">
          <i class="bottom-icon-sign"></i>点击签名
        </span>
      </div>
    </section>

    <sq-sign
      v-model="isShowPopup"
      @on-finish="finishHandler"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShowPopup: false
    }
  },

  methods: {
    finishHandler ({ image, imageFile }) {
      this.signImgUrl = image.src
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  padding: 20px;
  &-sign-wrap {
    border: 1px dashed #BFBFBF;
    margin: 20px;
    height: 110px;
    text-align: center;
    border-radius: 8px;
    color: #666;
    display: flex;
    &.border-solid {
      border-style: solid;
    }
    .bottom-img,.bottom-text {
      display: flex;
      flex: 1;
      height: 100%;
    }
    .bottom-text {
      align-items: center;
      justify-content: center;
      color: #D0D0D0;
      flex-direction: column;
      font-size: 15px;
    }
  }
  &-icon-sign {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 6px;
  }
}
</style>
