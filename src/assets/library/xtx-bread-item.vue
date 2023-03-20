<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
   <!-- 使用render和h动态创建图标 -->
  </div>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>
<style lang="less" scoped>
a{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
  color: black;
}

</style>
