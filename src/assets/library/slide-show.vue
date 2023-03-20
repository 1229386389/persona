<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item, index) in list" :key="index" :class="{ fade: activeIndex === index }">
          <img :src="item" alt="" />
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev">
      <i class="iconfont icon-xiangzuojiantou" @click="toggle(-1)"></i>
    </a>
    <a href="javascript:;" class="carousel-btn next">
      <i class="iconfont icon-xiangyoujiantou" @click="toggle(1)"></i>
    </a>
    <div class="carousel-indicator">
      <span v-for="(i, index) in list" :key="index" :class="{ active: activeIndex === index }"
            @click="activeIndex = index"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'slideShow',
  props: {
    list: { type: Array, default: () => [] },
    duration: { type: Number, default: 3000 }, // 轮播间隔时间
    autoPlayOn: { type: Boolean, default: true } // 是否自动播放
  },
  setup (props) {
    const activeIndex = ref(0)
    // 切换函数
    const toggle = (step) => {
      const temp = activeIndex.value + step
      if (temp < 0) {
        activeIndex.value = props.list.length - 1
      } else if (temp > props.list.length - 1) {
        activeIndex.value = 0
      } else {
        activeIndex.value = temp
      }
    }
    let timer = 0 // 定时器
    function autoPlay () { // 自动播放
      clearInterval(timer) // 清除之前的定时器
      timer = setInterval(() => { // 设置定时器
        toggle(1)
      }, props.duration)
    }
    function start () { // 播放
      if (props.autoPlayOn && props.list.length > 1) { // 只有数据长度大于1时候才自动播放
        autoPlay()
      }
    }
    function stop () { // 停止
      clearInterval(timer)
    }
    // 监听list当list改变时判断其是否能自动播放 并且使用immediate（默认触发）初始化自动轮播 监听
    watch(() => props.list, (newValue) => { // 如果监听对象中某一个属性的变化 例如：obj.name 需要写成函数返回该属性的方式才能监听到
      start()
    }, { immediate: true })
    onUnmounted(() => { // 组件销毁时取消定时器
      stop()
    })
    return { activeIndex, toggle, start, stop }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
a{
  text-decoration: none;
}
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 600px;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      top: 580px;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

</style>
