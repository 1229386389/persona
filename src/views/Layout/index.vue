<template>
  <div>
  <div class="Layout">
  <!-- 导航栏 -->
    <Menu class="menu" :class="{ active: isActive}" @changeCollapse="$event => isActive = !isActive"></Menu>
   <!-- 中间框 -->
  <div class="middle">
  <router-view></router-view>
  </div>
    <!-- 侧边栏 -->
   <div class="aside">
  <Aside ></Aside>
    </div>
</div>
<!-- 底边 -->
<Myfooter></Myfooter>
</div>
</template>

<script>
import Menu from './components/Menu.vue'
import Aside from './components/Aside.vue'
import Myfooter from './components/footer.vue'
import { ref } from 'vue'
export default {
  name: 'MyLayout',
  components: { Menu, Aside, Myfooter },
  setup () {
    const isActive = ref(false)
    return { isActive }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  //min-height: 1000px;
}
.Layout{
  display: flex;
  height: 1000px;
  .menu{
    flex: 1;
    // background-image: url(@/assets/menu.png);
      background: linear-gradient(
    -72deg,
    rgb(48, 138, 151) 0%,
    rgb(6, 90, 163) 100%
  );
    background-size: 300px;
    position: absolute;
  }
  .active{
   opacity: 0.9;
  }
  .aside{
  flex: 1;
  //float: left;
  }
  .middle{
    margin-left: 4.6%;
    flex:20;
    overflow: auto;
   // background: blueviolet;
   // float: left;
  }
}
</style>
