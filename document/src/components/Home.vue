<template>
  <div class="neon-home">
    <header class="header">
      <a class="logo-wrap">
        <img src="@/assets/images/logo.png" width="100px"/>
      </a>
    </header>

    <section class="section1" data-aos="fade-up">
      <div class="left">
        <p class="name">
          <span class="name-left">上汽保险移动端</span> <span class="name-right">Vue组件库</span>
        </p>
        <p class="desc">服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。</p>
        <a class="home-btn" href="#/quickstart">查看文档</a>
        <button class="home-btn scan-code" :class="{'active': active}">
          扫码体验<img src="~@/assets/images/qrcode.png" alt="示例" class="qrcode">
        </button>
        <!-- <a href="https://github.com/insaic/neon" target="_blank" class="star">
          <i class="github-logo"></i>Star<span class="star-num" v-show="starNum && starNum > 0">{{ starNum }}</span>
        </a> -->
      </div>
      <div class="right home-img"></div>
    </section>

    <section class="section2" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
      <h2 class="title">设计语言</h2>
      <div class="content">
        <div class="part" data-aos="fade-right">
          <div class="img-wrap">
            <div class="img img1"></div>
          </div>
          <p class="desc-top">质量可靠</p>
          <p class="desc-bottom">Quality</p>
        </div>
        <div class="part" data-aos="fade-right">
          <div class="img-wrap">
            <div class="img img2"></div>
          </div>
          <p class="desc-top">体验极致</p>
          <p class="desc-bottom">Experience</p>
        </div>
        <div class="part" data-aos="fade-left">
          <div class="img-wrap">
            <div class="img img3"></div>
          </div>
          <p class="desc-top">扩展性强</p>
          <p class="desc-bottom">Extend</p>
        </div>
        <div class="part" data-aos="fade-left">
          <div class="img-wrap">
            <div class="img img4"></div>
          </div>
          <p class="desc-top">标准规范</p>
          <p class="desc-bottom">Standard</p>
        </div>
      </div>
    </section>

    <section class="section3" data-aos="zoom-in">
      <h2 class="title">Let's Go!</h2>
      <p>命令行运行下列命令，快速安装使用：</p>
      <div class="code">
        <div class="notes"># 安装</div>
        <div>$ npm install @insaic/neon --save</div>
        <div class="notes"># 使用</div>
        <div>import neon from '@insaic/neon'</div>
        <div>Vue.use(neon)</div>
      </div>
      <p>需要帮助？请先阅读 <a href="#/quickstart" class="link">相关文档</a>，如果未能解决，可以到 GitHub 上 <a href="https://github.com/insaic/neon/issues" target="_brank" class="link">进行提问</a>。</p>
    </section>

    <footer class="footer">Copyright © 2018-present INSAIC. All Rights Reserved</footer>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

export default {
  data () {
    return {
      active: false,
      starNum: undefined
    }
  },

  created () {
    // this.ajax('https://api.github.com/repos/insaic/neon', 'get', {}, (response) => {
    //   this.starNum = response.stargazers_count
    // })
  },

  mounted () {
    document.addEventListener('click', this.qrCodeHandle, false)
  },

  methods: {
    qrCodeHandle (event) {
      if (event.target.nodeName === 'BUTTON') {
        this.active = !this.active
      } else if (this.active) {
        this.active = false
      }
    },
    ajax (url, method, params, cb) {
      let xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          let data = xhr.responseText
          try {
            data = JSON.parse(data)
          } catch (exc) {
          }
          if (cb) {
            cb(data)
          }
        }
      }

      let body
      if (params) {
        let bodies = []
        for (var name in params) {
          bodies.push(name + '=' + encodeURIComponent(params[name]))
        }

        body = bodies.join('&')
        if (body.length) {
          xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        }
      }
      xhr.send(body)
    }
  },

  beforeDestroy () {
    document.removeEventListener('click', this.qrCodeHandle)
  }
}
</script>

<style lang="sass">
html,body,#app
  height: 100%
  max-width: 100%
body
  overflow-x: hidden
.neon-home
  height: 100%
  background-color: #fff
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace
  .github-logo
    position: absolute
    top: 3px
    left: 8px
    display: inline-block
    width: 20px
    height: 20px
    margin-right: 4px
    background: url('~@/assets/images/github.png') no-repeat 0 0/cover
  .star
    padding: 4px 8px 4px 32px
    margin-left: 24px
    color: #444
    position: relative
    width: 68px
    height: 28px
    line-height: 28px
    border-radius: 2px
    border: 1px solid #d1d2d3
    background-color: #eff3f6
    background-image: linear-gradient(180deg,#fafbfc,#e4ebf0)
    transition: all .3s
    text-decoration: none
    &:hover
      background-image: linear-gradient(180deg,#f0f3f6,#dce3ec)
    &-num
      background-color: #243241
      color: #fff
      padding: 2px 14px
      position: absolute
      left: 100%
      margin-left: 14px
      top: 4px
      border-radius: 20px
      font-size: 12px
      line-height: initial
      &:before
        content: ''
        position: absolute
        left: -10px
        top: 50%
        margin-top: -6px
        border-top: 6px solid #fff
        border-left: 6px solid #fff
        border-right: 6px solid #243241
        border-bottom: 6px solid #fff
  .logo-wrap
    margin-left: 34px
  .header
    padding: .8rem
    border-bottom: 1px solid #eaecef
    position: absolute
    top: 0
    left: 0
    width: 100%
    box-sizing: border-box
  .footer
    padding: 1.4rem
    border-top: 1px solid #eaecef
    text-align: center
    color: #fff
    background-color: #333
  .section1
    max-width: 1200px
    min-height: 626px
    margin: 0 auto
    height: 100%
    position: relative
    padding: 0 24px
    padding-top: 62px
    box-sizing: border-box
    .left
      display: inline-block
      width: 46%
      max-width: 460px
      p
        margin: 0
      .name
        margin-top: 170px
        padding: 0 24px
        &-left
          font-size: 24px
        &-right
          font-size: 34px
          margin-left: 10px
      .desc
        padding: 0 24px
        font-size: 16px
  .home-btn
    background-color: #3295FF
    color: #fff
    border-radius: 100px
    padding: 10px 24px
    border: 0
    margin-left: 24px
    font-size: 20px
    margin-top: 38px
    box-shadow: 0 0 10px #3295ff
    display: inline-block
    cursor: pointer
    &:focus
      outline: none
    &.scan-code
      background-color: #ecf6ff
      color: #048efa
      box-shadow: none
      position: relative
      .qrcode
        position: absolute
        top: 48px
        left: -34px
        transform: scale(0)
        transition: all .3s
      &:hover,&.active
        .qrcode
          transform: scale(1)
  .home-img
    width: 50%
    max-width: 658px
    min-width: 420px
    min-height: 626px
    display: inline-block
    position: absolute
    right: 0
    top: 70px
    background: url('~@/assets/images/Bitmap.svg')
    background-repeat: no-repeat
    background-size: 100% 100%
    background-position: 0 0
  .section2
    margin-top: 40px
    background-color: #3295FF
    color: #fff
    height: 594px
    padding-top: 114px
    box-sizing: border-box
    h2
      margin: 0
      border: 0
    .title
      text-align: center
      font-size: 40px
    .content
      display: flex
      justify-content: center
      margin-top: 86px
  .part
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    flex-flow: column
    .img-wrap
      background-color: #fff
      border-radius: 50%
      width: 90px
      height: 90px
      display: flex
      justify-content: center
      align-items: center
    .img
      background-repeat: no-repeat
      background-size: contain
      background-position: 0 0
    .img1
      width: 37px
      height: 51px
      background-image: url('~@/assets/images/deng.svg')
    .img2
      width: 56px
      height: 59px
      background-image: url('~@/assets/images/star.svg')
    .img3
      width: 52px
      height: 52px
      background-image: url('~@/assets/images/img3.svg')
    .img4
      width: 51px
      height: 52px
      background-image: url('~@/assets/images/img4.svg')
    .desc-top
      margin-top: 16px
      font-size: 20px
      margin-bottom: 0
    .desc-bottom
      margin-top: 0
      font-size: 18px
      margin-bottom: 0
  .section3
    h2,p
      border: 0
      margin: 0
      padding: 0
    .title,p
      text-align: center
      margin: 2em 0
    .code
      width: 90%
      max-width: 840px
      border-radius: 4px
      background: #f2f4f5
      line-height: 28px
      margin: 16px auto
      color: #151e26
      font-size: 16px
      text-align: left
      padding: 20px 50px
      box-sizing: border-box
      .notes
        color: #697b8c
      .link
        color: #009ce4

@media screen and (max-width: 750px)
  .neon-home
    .section1
      text-align: center
      .left
        position: initial
        width: 100%
        margin-top: 314px
        .name
          margin-top: 0
          &-left
            font-size: 18px
          &-right
            font-size: 24px
      .right
        position: absolute
        width: 100%
        min-width: initial
        min-height: 50%
        transform: scale(.7)
      .home-btn
        font-size: 16px
    .section2
      .part
        transform: scale(.8) !important
</style>
