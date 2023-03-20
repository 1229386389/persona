<template>
  <div>
    <div class="tag" @click="dialogVisible = !dialogVisible">{{ name }}</div>
    <el-dialog v-model="dialogVisible" title="展示" width="70%" center>
      <img :src="url" class="show" width="600" height="300">
    </el-dialog>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'tagItem',
  props: {
    name: { type: String, required: true },
    url: {
      type: String
    }
  },
  setup (props) {
    const dialogVisible = ref(false)
    return { dialogVisible }
  }
}
</script>
<style lang="less" scoped>
.tag {
  Border-radius: 20%;
  width: 50px;
  height: 25px;
  margin: 10px 10px;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  font-weight: bold;
  text-align: center;
  transition: all .5s;
  font-family: "Microsoft JhengHei", fantasy;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }
.show{
  width:100px;
  height:200px;
}
}
</style>
