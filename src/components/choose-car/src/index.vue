<template>
    <div class="sq-brandCars" ref="menuWrapper" v-if="myShowChooseCar">
      <!-- +++++++++++++++++++++++++++品牌选项+++++++++++++++++++++++++++ -->
      <div class="sq-brandCars-menu-wrapper" ref="brandCars"  v-if="isShowBrandCars">
        <ul class="sq-brandCars-list">
          <li class="sq-brandCars-search">
            <input type="text" class="sq-brandCars-search-input" @keypress="getKeyCode" v-model="search" placeholder="搜索品牌车型">
            <i class="sq-icon sq-icon-search sq-brandCars-search-icon" @click="searchCarModels"></i>
          </li>
          <li class="sq-brandCars-item" v-for="(item, index) in brandCategorys" :key="index">
            <h3 class="sq-brandCars-menu-title" :class="item">{{item}}</h3>
            <ul class="sq-brandCars-menu-list">
              <li v-for="(car, inx) in carsData[item]" :key="inx" class="sq-brandCars-menu-item" @click="showModel(car.brandCategoryCode, car.brandCategoryName, item)">
                <div class="sq-brandCars-menu-list-item">
                  <!--作用域插槽， 可传参-->
                  <img :src="imgConfig[car.brandCategoryCode]" :alt="car.brandCategoryCode" class="sq-brandCars-category-img">
                  <span>{{car.brandCategoryName}}</span>
                </div>
              </li>

            </ul>
          </li>
        </ul>
      </div>
      <!-- +++++++++++++++++++++++++++选车系+++++++++++++++++++++++++++ -->
      <div class="sq-selectcar" v-if="showSelectCar" ref="selectCar">
        <div class="sq-selectcar-slide" ref="slide">
          <h3 class="sq-selectcar-carts-first-title">
            <!--<slot name="brandCategoryCode"></slot>-->
            <img :src="imgConfig[brandCategoryData.code]" :alt="brandCategoryData.code" class="sq-selectcar-carts-detail-icon">
            <span>{{ brandCategoryData.name }}</span>
          </h3>
          <ul class="sq-selectcar-cars-ul">
            <li class="sq-selectcar-cars-list" v-for="items in selectCar" :key="items.brandId">
              <h3 class="sq-selectcar-carts-second-title">{{ items.brandName }}</h3>
              <ul class="sq-selectcar-cars-ul">
                <li class="sq-selectcar-cars-item" v-for="detail in items.jyVehicleFamilyMOs" :key="detail.familyId">
                  <div class="sq-selectcar-car-list-item border_bottom" @click.stop="jumpChooseCar(detail.brandId, detail.familyId);">{{ detail.familyName }}</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="sq-selectcar-car-modal" v-if="showSelectCar" @click="closeCarModal"></div>

      <!-- +++++++++++++++++++++++++++++++++选车型+++++++++++++++++++++++++++++++ -->
      <div class="sq-selectmodel" v-if="showSelectModel"  ref="selectModel">
        <div class="sq-selectmodel-wrap">
          <div class="sq-selectmodel-icon-title">
            <!--<slot name="selectModelCode"></slot>-->
            <img :src="imgConfig[brandCategoryData.code]" :alt="brandCategoryData.code" class="sq-selectmodel-model-icon">
            <span>{{ brandCategoryData.name }}</span>
          </div>
          <div class="sq-selectmodel-wrapper">
            <div class="sq-selectmodel-inner" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
              <sq-loadmore :loading="loading" :bottom-fun="loadMore" :is-finished-load="isFinishedLoad" :bottom-finished-text="finishedText">
                <ul class="sq-selectmodel-ul">
                  <li class="sq-selectmodel-list" v-for="(item, index) in selectModel" :key="index">
                    <h3 class="sq-selectmodel-second-title" v-if="item.carYear">{{ item.carYear }}款</h3>
                    <ul class="sq-selectmodel-detail-ul">
                      <li class="sq-selectmodel-detail-item" @click.stop="closeSelectModel(detail)" v-for="detail in item.insurerVehicleModelMOs" :key="detail.modelCode">
                        <div class="sq-selectmodel-car-list-item" v-if="detail.carYear">
                          {{ `${detail.displayName}` }}
                        </div>
                        <div class="sq-selectmodel-car-list-item" v-if="!detail.carYear">
                          {{ ` ${detail.displayName}` }}
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </sq-loadmore>

              <div class="sq-selectmodel-footer" v-if="isShowText">
                <span class="sq-selectmodel-line-left"></span>
                <span class="sq-selectmodel-line-text">不好意思， 没有数据了</span>
                <span class="sq-selectmodel-line-left"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sq-selectmodel-model-modal" v-if="showSelectModel"></div>
      <!--<div class="car-index" v-show="showStartColor">{{ brandCategorys[carIndex] || carNum }}</div>-->

      <!-- +++++++++++++++++++++++++++++++++搜索车型+++++++++++++++++++++++++++++++++ -->
      <div class="sq-search" v-if="showSearchModal">
        <div class="sq-search-inners" ref="searchWap" :style="{ height: searchWapperHeight + 'px' }">
          <sq-loadmore :loading="searchLoading" :bottom-fun="searchCarLoadMore" :is-finished-load="searchIsFinishedLoad" :bottom-finished-text="finishedText">
            <ul class="sq-search-list">
              <li class="sq-search-list-item" v-for="(item, index) in searchCarArr" :key="index" @click.stop="closeSelectModel(item)">{{ item.displayName }}</li>
            </ul>
          </sq-loadmore>

          <div class="sq-selectmodel-footer" v-if="showSearchLoadText">
            <span class="sq-selectmodel-line-left"></span>
            <span class="sq-selectmodel-line-text">不好意思， 没有数据了</span>
            <span class="sq-selectmodel-line-left"></span>
          </div>
        </div>
      </div>
      <div class="sq-selectmodel-model-modal" v-if="showSearchModal"></div>
      <!-- +++++++++++++++++++++++++++++车辆品牌索引+++++++++++++++++++++++++++ -->
      <div class="sq-brandCars-category-rightbar" :class="{'start': showStartColor}" v-if="showIndex">
        <ul class="sq-brandCars-category-rightbar-list" @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
          <li v-for="(item, index) in brandCategorys" :key="index" class="sq-brandCars-category-rightbar-item">
            <div :class="{ 'active': item ===  rightIndex }">{{ item }}</div>
          </li>
        </ul>
      </div>
      <!-- ++++++++++++++++++++++++++++++++车辆品牌索引展示++++++++++++++++++++++++ -->
      <div class="car-index" v-show="showStartColor">{{ brandCategorys[carIndex] || carNum }}</div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BrandCars',
  model: {
    prop: 'showChooseCar',
    event: 'praent-event'
  },
  props: {
    carsData: {
      type: Object
    },
    selectCar: {
      type: Array
    },
    selectModel: {
      type: Array
    },
    loadMoreArr: {
      type: Array
    },
    showChooseCar: {
      type: Boolean,
      default: true
    },
    imgConfig: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      brandCategorys: [],
      titlePos: {},
      brandCategoryData: {},
      showSelectCar: false,
      showSelectModel: false,
      isShowBrandCars: true,
      isShowText: false,
      showSearchLoadText: false,
      slideHeight: 0,
      start: null,
      lastDistance: 0,
      loading: false,
      wrapperHeight: 0,
      isFinishedLoad: false,
      carIndex: 0,
      showStartColor: false,
      curDistance: document.body.clientHeight || document.documentElement.clientHeight,
      carNum: '',
      search: '',
      selectCarStartX: 0,
      selectCarStartY: 0,
      modelsStartX: 0,
      modelsStartY: 0,
      brandCarStartX: 0,
      brandCarStartY: 0,
      firstMove: true,
      searchCarStartX: 0,
      searchCarStartY: 0,
      searchCarArr: [],
      showSearchModal: false,
      searchWapperHeight: 0,
      searchLoading: false,
      searchIsFinishedLoad: false,
      myShowChooseCar: this.showChooseCar,
      scrollArr: [],
      rightIndex: '',
      finishedText: '',
      showIndex: true,
      isScroll: false
    }
  },
  watch: {
    showChooseCar (newVal, oldVal) {
      this.myShowChooseCar = newVal
    },
    myShowChooseCar (newVal, oldVal) {
      this.$emit('update:showChooseCar', this.myShowChooseCar)
      this.$emit('praent-event', this.myShowChooseCar)
      if (newVal) {
        this.showSelectCar = false
        this.showSearchModal = false
        this.showSelectModel = false
        this.isShowBrandCars = true
        this.showIndex = true
        this.getBrandCategoryArr()
      }
    }
  },
  methods: {
    touchStart (e) {
      this.showStartColor = true
      this.isScroll = true
      this.start = e.changedTouches[0].clientY - this.curDistance / 4
      const everyDistance = (this.curDistance - 0) / this.brandCategorys.length / 2
      this.carIndex = Math.floor(this.start / everyDistance)
      let listItem = document.querySelectorAll('.sq-brandCars-list > .sq-brandCars-item')
      let itemLi = listItem[this.carIndex]
      this.menuScroll.scrollToElement(itemLi, 300)
      e.stopPropagation()
      e.preventDefault()
    },
    touchMove (e) {
      // 计算每个区间的距离
      let curMove = e.changedTouches[0].clientY - this.curDistance / 4
      let maxHeight = (this.curDistance - 0) / 2
      if (curMove <= 0) {
        curMove = 0
      } else if (curMove >= maxHeight) {
        curMove = maxHeight
      }
      const everyDistance = (this.curDistance - 0) / this.brandCategorys.length / 2
      this.carIndex = Math.floor(curMove / everyDistance)
      if (this.carIndex < 0) {
        this.carIndex = 0
      } else if (this.carIndex > this.brandCategorys.length - 1) {
        this.carIndex = this.brandCategorys.length - 1
      }
      this.$nextTick(() => {
        let listItem = document.querySelectorAll('.sq-brandCars-list > .sq-brandCars-item')
        let itemLi = listItem[this.carIndex]
        this.menuScroll.scrollToElement(itemLi, 300)
        this.carNum = this.brandCategorys[this.carIndex]
        this.rightIndex = this.carNum
        e.stopPropagation()
        e.preventDefault()
      })
    },
    touchEnd (e) {
      this.showStartColor = false
      this.isScroll = false
      this.$nextTick(() => {
        let listItem = document.querySelectorAll('.sq-brandCars-list > .sq-brandCars-item')
        let itemLi = listItem[this.carIndex]
        this.menuScroll.scrollToElement(itemLi, 300)
        this.carNum = this.brandCategorys[this.carIndex]
        this.rightIndex = this.carNum
      })
      e.stopPropagation()
      e.preventDefault()
    },
    touchMoveLogic (e, refs, touchStartX, touchStartY) {
      let currentDisX = e.changedTouches[0].pageX
      let currentDisY = e.changedTouches[0].pageY
      let lastDistanceX = Math.abs(currentDisX - this[touchStartX])
      let lastDistanceY = Math.abs(currentDisY - this[touchStartY])
      let currentMoveDisX = currentDisX - this[touchStartX]
      // 判断滑动方向
      if (this.firstMove) {
        if (lastDistanceX > lastDistanceY && (currentDisX - this[touchStartX] > 0)) {
          this.$refs.menuWrapper.style.overflowY = 'hidden'
          if (refs === 'selectCar') {
            this.$refs.carsWrapper.style.overflowY = 'hidden'
          }
          if (currentMoveDisX < 0) {
            this.$refs[refs].style.transform = 'translateX(0)'
          } else {
            this.$refs[refs].style.transform = 'translateX(' + currentMoveDisX + 'px)'
          }
        } else {
          this.firstMove = false
          return false
        }
      }
      e.stopPropagation()
      // e.preventDefault()
    },
    touchEndLogic (e, refs, showModal, touchStart) {
      let currentDis = e.changedTouches[0].pageX
      let lastDistance = currentDis - this[touchStart]
      let selectModelWidth = this.$refs[refs].clientWidth
      this.$refs.menuWrapper.style.overflowY = 'scroll'
      if (refs === 'selectCar') {
        this.$refs.carsWrapper.style.overflowY = 'scroll'
      }
      if (this.firstMove) {
        this.$refs[refs].style.overflow = 'auto'
        if ((lastDistance > 0 && lastDistance < (selectModelWidth / 2)) || lastDistance < 0) {
          this.$refs[refs].style.transform = 'translateX(0)'
        } else if (lastDistance === 0) {
          return false
        } else {
          this.$refs[refs].style.transform = 'translateX(100%)'
          this[showModal] = false
          if (refs === 'selectModel' || refs === 'searchWap') {
            this.isShowBrandCars = true
          }
          if (refs === 'selectModel') {
            this.showSelectCar = true
          }
          if (showModal === 'myShowChooseCar') {
            this.$emit('update:showChooseCar', this.myShowChooseCar)
            this.$emit('praent-event', this.myShowChooseCar)
          }
          if (showModal === 'showSelectCar' || showModal === 'showSearchModal') {
            this.showIndex = true
          }
        }
      } else {
        this.$refs[refs].style.transform = 'translateX(0)'
      }
      e.stopPropagation()
      // e.preventDefault()
    },
    brandCarsStart (e) {
      this.firstMove = true
      this.brandCarStartX = e.changedTouches[0].pageX
      this.brandCarStartY = e.changedTouches[0].pageY
    },
    brandCarsMove (e) {
      this.touchMoveLogic(e, 'brandCars', 'brandCarStartX', 'brandCarStartY')
    },
    brandCarsEnd (e) {
      this.touchEndLogic(e, 'brandCars', 'myShowChooseCar', 'brandCarStartX')
    },
    selectCarStarts (e) {
      this.firstMove = true
      this.selectCarStartX = e.changedTouches[0].pageX
      this.selectCarStartY = e.changedTouches[0].pageY
    },
    selectCarMove (e) {
      this.touchMoveLogic(e, 'selectCar', 'selectCarStartX', 'selectCarStartY')
    },
    selectCarEnd (e) {
      this.touchEndLogic(e, 'selectCar', 'showSelectCar', 'selectCarStartX')
    },
    modelStart (e) {
      this.firstMove = true
      this.modelsStartX = e.changedTouches[0].pageX
      this.modelsStartY = e.changedTouches[0].pageY
    },
    modelMove (e) {
      this.touchMoveLogic(e, 'selectModel', 'modelsStartX', 'modelsStartY')
    },
    modelEnd (e) {
      this.touchEndLogic(e, 'selectModel', 'showSelectModel', 'modelsStartX')
    },
    searchStart (e) {
      this.firstMove = true
      this.searchCarStartX = e.changedTouches[0].pageX
      this.searchCarStartY = e.changedTouches[0].pageY
    },
    searchMove (e) {
      this.touchMoveLogic(e, 'searchWap', 'searchCarStartX', 'searchCarStartY')
    },
    searchEnd (e) {
      this.touchEndLogic(e, 'searchWap', 'showSearchModal', 'searchCarStartX')
    },
    getBrandCategoryArr () {
      this.brandCategorys = Object.keys(this.carsData)
      this.$nextTick(() => {
        this.brandCategorys.forEach(item => {
          let scroll = document.querySelector(`.${item}`).offsetTop
          this.scrollArr.push(scroll)
          this.titlePos[item] = scroll
        })
        if (!this.menuScroll) {
          this.menuScroll = new BScroll(this.$refs.brandCars, {
            // 内容区可点击
            click: true,
            // 向外派发事件
            probeType: 3
          })
          this.menuScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y)) // 将位置四舍五入后取绝对值
            !this.isScroll && this.handleScroll(this.scrollY)
          })
        } else {
          this.menuScroll.refresh()
        }
      })
    },
    showModel (code, name, item) {
      this.showSelectCar = true
      this.showIndex = false
      this.$refs.menuWrapper.style.overflowY = 'hidden'
      this.$nextTick(() => {
        // 目标盒子内容总高度 - 窗口可视区域高度
        let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
        this.slideHeight = this.$refs.slide.offsetHeight - clientWidth
        this.menuScroll.destroy()
        this.$nextTick(() => {
          if (!this.childScroll) {
            this.childScroll = new BScroll(this.$refs.selectCar, {
              click: true
            })
          } else {
            this.childScroll.refresh()
          }
        })
      })
      this.brandCategoryData.code = code
      this.brandCategoryData.name = name
      this.brandCategoryData.item = item
      this.$emit('brandCategoryCode', code)
    },
    jumpChooseCar (brandId, familyId) {
      this.showSelectModel = true
      this.showSelectCar = false
      this.isShowBrandCars = false
      this.$refs.menuWrapper.style.overflowY = 'hidden'
      this.$emit('brandModelId', { brandId, familyId })
      this.childScroll.destroy()
      this.childScroll.scrollTo(0, 0)
      try {
        setTimeout(() => {
          if (this.$refs.wrapper) {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
          }
        }, 30)
      } catch (e) {
      }
    },
    closeCarModal () {
      this.showSelectCar = false
      this.showIndex = true
      this.$refs.menuWrapper.style.overflowY = 'scroll'
    },
    closeSelectModel (detail) {
      this.showSelectModel = false
      this.myShowChooseCar = false
      this.showSelectCar = false
      this.showIndex = false
      this.$refs.menuWrapper.style.overflowY = 'scroll'
      this.$emit('update:showChooseCar', this.myShowChooseCar)
      this.$emit('praent-event', this.myShowChooseCar)
      this.$emit('carDetail', detail)
    },
    callback (arr) {
      setTimeout(() => {
        let newSelectModel = JSON.parse(JSON.stringify(arr))
        // this.selectModel.push(...arr)
        if (this.selectModel.length > 0) {
          this.selectModel.forEach((item, index) => {
            newSelectModel.forEach((val, i) => {
              if (item.carYear === val.carYear) {
                delete val.carYear
              }
            })
          })
        }
        this.selectModel.push(...newSelectModel)
        this.loading = false
        if (arr.length <= 0) {
          this.isShowText = true
          this.isFinishedLoad = true
        }
      }, 200)
    },
    loadMore (e) {
      this.loading = true
      this.$emit('loadMore', this.callback)
    },
    getSearchCar (searchCar) {
      this.searchCarArr = searchCar
      if (this.searchCarArr.length > 0) {
        this.showSearchModal = true
        this.showIndex = false
        this.isShowBrandCars = false
        this.$refs.menuWrapper.style.overflowY = 'hidden'
        this.menuScroll && this.menuScroll.destroy()
        setTimeout(() => {
          if (this.$refs.searchWap) {
            this.searchWapperHeight = document.documentElement.clientHeight - this.$refs.searchWap.getBoundingClientRect().top
          }
        }, 30)
      } else {
        this.$toast.warn('没有查询到相关数据', 3000)
      }
    },
    searchCarModels () {
      if (this.search.trim().length < 5) {
        this.$toast.text('搜索字符不能少于5位', 3000)
        return
      }
      this.$emit('searchOption', this.search, this.getSearchCar)
    },
    getKeyCode (e) {
      if (e.keyCode === 13) {
        if (this.search.trim().length < 5) {
          this.$toast.text('搜索字符不能少于5位', 3000)
          return
        }
        this.$emit('searchOption', this.search, this.getSearchCar)
      }
    },
    searchCallBack (arr) {
      setTimeout(() => {
        this.searchCarArr.push(...arr)
        this.searchLoading = false
        if (arr.length <= 0) {
          this.showSearchLoadText = true
          this.searchIsFinishedLoad = true
        }
      }, 200)
    },
    searchCarLoadMore () {
      this.searchLoading = true
      this.$emit('searchLoadMore', this.searchCallBack)
    },
    handleScroll (scrollTop) {
      let findIndexArr
      for (var i = 0; i < this.scrollArr.length; i++) {
        if (this.scrollArr[i] <= scrollTop && this.scrollArr[i + 1] > scrollTop) {
          findIndexArr = i
        }
      }
      this.rightIndex = this.brandCategorys[findIndexArr]
    }
  },
  mounted () {
    if (this.myShowChooseCar) {
      this.getBrandCategoryArr()
    }
  },
  destroyed () {
    this.menuScroll && this.menuScroll.destroy()
    this.childScroll && this.childScroll.destroy()
  }
}
</script>

<style lang="scss">
/*依赖 base 里的动画 */
.sq-brandCars {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 333;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0,0,0);
  &-search {
    background: #F5F5F5;
    padding: 10px 15px;
    position: relative;
  }
  &-search-input {
    width: 100%;
    height: 38px;
    border-radius: 1000px;
    border: 0;
    border: 1px solid #666;
    padding-left: 15px;
    box-sizing: border-box;
    -webkit-appearance: none;
  }
  &-search-icon {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }
  &-menu-wrapper {
    // width: 100%;
    // overflow: auto;
    // background: #fff;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 333;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0,0,0);
    box-shadow: rgba(0, 0, 0, 0.5) -2px 0px 5px;
  }
  &-list {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
  }
  &-item {
    box-sizing: border-box;
    list-style: none;
  }
  &-menu-title {
    background: #F5F5F5;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0;
    padding-left: 15px;
  }
  &-menu-list {
    padding: 0;
    margin: 0;
  }
  &-menu-item {
    @include mix-1px($top: 1);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-menu-list-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    padding-left: 15px;
  }
  &-category-img {
    width: 20px;
    vertical-align: middle;
    padding-left: 3px;
  }
  &-category-rightbar {
    position: fixed;
    top: 0;
    right: 0px;
    width: 30px;
    text-align: right;
    z-index: 444;
    height: 100%;
    box-sizing: border-box;
    &.start {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  &-category-rightbar-list {
    position: fixed;
    top: 0;
    right: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 30px;
    height: 50%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
  }
  &-category-rightbar-item {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    color: #007AFF;
    font-size: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
    &>.active {
      display: inline-block;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      background: #007AFF;
      color: #fff;
      border-radius: 1000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      vertical-align: middle;
    }
  }
}
.sq-selectcar {
  overflow-x: hidden;
  width: 70%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 556;
  transition-property: transform, -webkit-transform;
  animation: fadeLeft 0.4s ease-out;
  animation-fill-mode: forwards;
  &-car-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 555;
  }
  &-slide {
    height: auto;
    background: #fff;
  }
  &-cars-ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-cars-list {
    list-style: none;
  }
  &-carts-first-title {
    margin: 0;
    padding: 0;
    padding-left: 15px;
    height: 80px;
    line-height: 80px;
    background: #fff;
    font-size: 18px;
    letter-spacing: 2px;
  }
  &-carts-detail-icon {
    width: 35px;
    vertical-align: middle;
    padding-right: 3px;
    margin-bottom: 4px;
  }
  &-detail-icon {
    width: 35px;
    vertical-align: middle;
    padding-right: 3px;
    margin-bottom: 4px;
  }
  &-carts-second-title {
    margin: 0;
    padding: 0;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    background: #F5F5F5;
    color: #9A9A9A;
    font-weight: 400;
    font-size: 14px;
  }
  &-cars-item {
    padding-left: 15px;
  }
  &-car-list-item {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    position: relative;
    @include mix-1px($top: 1);
    &.checked {
      color: #007EFF;
    }
    &-checked {
      // display: none;
      position: absolute;
      top: 0;
      right: 15px;
      color: #007EFF;
      display: inline-block;
      height: 44px;
      line-height: 44px;
      text-align: right;
      font-size: 16px;
    }
  }
}
.sq-selectmodel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #fff;
  z-index: 888;
  animation: fadeInRight 0.5s ease;
  animation-fill-mode: forwards;
  &-wrap {
    width: 100%;
    // height: 100%;
    background: #fff;
    position: relative;
    z-index: 333;
    // box-shadow: rgba(0, 0, 0, 0.5) -2px 0px 5px;
  }
  &-model-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 777;
  }
  &-model-icon {
    width: 35px;
    vertical-align: middle;
    padding-right: 3px;
    margin-bottom: 4px;
  }
  &-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 80px;
    // overflow: auto;
  }
  &-inner {
    width: 100%;
    overflow: scroll;
  }
  &-icon-title {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding-left: 15px;
    font-size: 18px;
    letter-spacing: 2px;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
    box-sizing: border-box;
  }
  &-ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-list {
    // padding-left: 15px;
    word-break: break-all;
  }
  &-second-title {
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    background: #F5F5F5;
    padding-left: 15px;
    color: #9A9A9A;
    font-weight: 400;
  }
  &-detail-item {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-detail-ul {
    margin: 0;
    padding: 0;
    list-style: none;
    padding-left: 15px;
  }
  &-car-list-item {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 15px;
    box-sizing: border-box;
    line-height: 1.5em;
    @include mix-1px($top: 1);
  }
  &-footer {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 12px;
    color: #ccc;
  }
  &-line-left {
    width: 50px;
    background: #ccc;
    display: inline-block;
    vertical-align: middle;
    @include mix-1px($top: 1);
  }
}
.car-index {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99999;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
.sq-search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 888;
  background: #fff;
  &-inners {
    width: 100%;
    overflow: scroll;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) -2px 0px 5px;
  }
  &-list {
    margin: 0;
    padding: 0;
    list-style: none;
    padding: 0 15px;
    box-sizing: border-box;
  }
  &-list-item {
    margin: 0;
    padding: 0;
    list-style: none;
    padding-top: 8px;
    padding-bottom: 8px;
    box-sizing: border-box;
    @include mix-1px($top: 1);
  }
}
</style>
