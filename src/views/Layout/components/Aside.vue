<template>
  <div class="aside">
    <el-card shadow="always"> 时光如水,今昔是何年</el-card>
      <span class="year">{{  dayjs(time).format('YYYY-MM-DD') }} </span>
        <el-divider>
    </el-divider>
     <aside-item class="time"></aside-item>
  </div>
</template>
<script>
import asideItem from './Aside-item.vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
export default {
  name: 'MyAside',
  components: { asideItem },
  setup () {
    const time = ref(new Date())
    return { time, dayjs }
  }
}
</script>
<style lang="less" scoped>
.aside{
  width: 200px;
  justify-content: space-between;
  *{
    margin:5px 10px;
  }
  .year {
    position: relative;
    top: 25px;
    font-size: small;
    left: 50%;
  }
}
.time{
  position: relative;
  //left: 100px;
}
</style>
