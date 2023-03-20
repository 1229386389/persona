<template>
  <div class="default">
    <slide-show :list="list"></slide-show>
  </div>
</template>
<script>
import img1 from '@/assets/image/1.jpg'
import img2 from '@/assets/image/2.jpg'
import img3 from '@/assets/image/3.jpg'
import img4 from '@/assets/image/login3.jpg'
export default {
  name: 'MyDefault',
  setup () {
    const list = [img1, img2, img3, img4]
    return { list }
  }
}
</script>
<style lang="less" scoped>
.default{
  height: 700px;
}
</style>
