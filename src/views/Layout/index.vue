<template>
  <div class="Layout">
  <!-- 导航栏 -->
    <Menu class="menu" :class="{ active: isActive}" @changeCollapse="$event => isActive = !isActive"></Menu>
   <!-- 中间框 -->
  <div class="middle">
    <xtx-bread>
      <xtx-bread-item :to="'/'">主页</xtx-bread-item>
      <xtx-bread-item v-if="currentRoute" :to="currentRoute.path">{{currentRoute.meta.name}}</xtx-bread-item>
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
  <Aside ></Aside>
    </div>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
import Aside from './components/Aside.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
    return { isActive, menuList, currentRoute }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 400px;
  height: 100%;
  //min-height: 1000px;
}
.Layout{
  display: flex;
  height: 1000px;
  .menu{
    flex: 4;
    // background-image: url(@/assets/menu.png);
      background: linear-gradient(
    -72deg,
    rgb(48, 138, 151) 0%,
    rgb(6, 90, 163) 100%
  );
    background-size: 300px;
    //position: absolute;
  }
  .active{
   opacity: 0.9;
  }
  .aside{
  //border-left: 1px solid black;
  flex: 1;
  //float: left;
  }
  .middle{
    margin-left:1%;
    flex:20;
    overflow: auto;
   // background: blueviolet;
   // float: left;
  }
  .bottom{
    // position: relative;
    margin-top: 20px;
    bottom: 0;
    width: 95%;
    color: rgb(152, 152, 150);
    text-align: center;
    *{
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
}
</style>
