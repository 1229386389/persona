<template>
  <div>
    <Mynav></Mynav>
    <router-view></router-view>
  </div>
</template>
<script>
import Mynav from './components/nav.vue'
export default {
  name: 'MyHome',
  components: { Mynav },
  setup () {

  }
}
</script>
<style lang="less" scoped>
</style>
