<template>
  <el-menu default-active="/about" class="el-menu-vertical-demo menu" :collapse="isCollapse" router>
  <el-button type="primary"  :icon="isCollapse ? 'CirclePlusFilled':'RemoveFilled'" @click="changeShow" class="change"/>
   <!-- 使用路由动态生成导航栏 -->
   <el-menu-item v-for="(route,index) in menuList" :key="index" :index="route.path" >
      <el-icon><component :is="route.meta.icon"/></el-icon>
      <template #title>{{route.meta.name}}</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Setting,
  RemoveFilled,
  CirclePlusFilled
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default {
  name: 'MyMenu',
  components: { Document, IconMenu, Setting },
  setup (props, { emit }) {
    const isCollapse = ref(true) // 展开菜单
    const router = useRouter()
    // 筛选路由
    const menuList = ref(router.getRoutes().filter((item) => item.meta.isMenu))
    const changeShow = () => {
      isCollapse.value = !isCollapse.value
      emit('change-collapse', isCollapse.value)
    }
    return { isCollapse, RemoveFilled, CirclePlusFilled, menuList, changeShow }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 1000px
}
.menu {
  height: inherit;
  .change {
   height: 20px;
   width: 100%;
  }
}
</style>
