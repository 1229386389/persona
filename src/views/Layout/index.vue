<template>
  <div class="Layout">
    <!-- 导航栏 -->
    <Menu class="menu" :style="{ top: scrollTop + 'px' }" @changeCollapse="$event => isActive = !isActive"></Menu>
    <!-- 中间框 -->
    <div class="middle" ref="target">
      <xtx-bread>
        <xtx-bread-item :to="'/'">主页</xtx-bread-item>
        <xtx-bread-item v-if="currentRoute" :to="currentRoute.path">{{ currentRoute.meta.name }}</xtx-bread-item>
      </xtx-bread>
      <hr>
      <router-view></router-view>
      <div class="bottom">
        <hr>
        <p>2023</p>
        <span>
          解释权归属斯大林的猫
        </span>
      </div>
    </div>
    <!-- 侧边栏 -->
    <div class="aside">
      <Aside></Aside>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Aside from './components/Aside.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'MyLayout',
  components: { Menu, Aside },
  setup () {
    const isActive = ref(false)
    const router = useRouter()
    const route = useRoute()
    // 筛选路由
    const menuList = ref(router.getRoutes().filter((item) => item.meta.isMenu))
    const currentRoute = ref(null)
    watch(() => route.path, (newVal) => {
      // current.value = route.path.slice(1)
      currentRoute.value = menuList.value.find((item) => {
        return item.path === newVal
      })
    }, { immediate: true })
    const target = ref(null)
    const scrollTop = ref(0)
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      // console.log(target.value.offsetTop)
      if (target.value && currentScroll >= target.value.offsetTop) {
        if (currentScroll <= 500) {
          scrollTop.value = currentScroll - target.value.offsetTop
        }
      } else {
        scrollTop.value = 0
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    return { isActive, scroll, menuList, currentRoute, target, scrollTop }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  //width: 400px;
  //height: 100%;
  //min-height: 1000px;
  height: auto;
}

.Layout {
  display: flex;
  min-height: 900px;

  //height: 1000px;
  .menu {
    //position: relative;
    //top: 0;
    flex: 4;
    // background-image: url(@/assets/menu.png);
    background: linear-gradient(-72deg,
        rgb(48, 138, 151) 0%,
        rgb(6, 90, 163) 100%);
    background-size: 300px;
    //position: absolute;
    //height: 100%;
    //min-height: 750px;
  }

  .active {
    opacity: 0.9;
  }

  .aside {
    //border-left: 1px solid black;
    flex: 1;
    //float: left;
  }

  .middle {
    margin-left: 1%;
    flex: 20;
    overflow: auto;
    // background: blueviolet;
    // float: left;
  }

  .bottom {
    // position: relative;
    margin-top: 20px;
    bottom: 0;
    width: 95%;
    color: rgb(152, 152, 150);
    text-align: center;

    * {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
}
</style>
