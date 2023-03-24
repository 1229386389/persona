<template>
  <el-card>
  <footer class="app-footer">
    <div class="contact">
      <div class="container">
        <dl v-for="(item, index) in introduce" :key="index">
          {{ item }}
        </dl>
      </div>
    </div>
  </footer>
  </el-card>
</template>

<script>
import { ref, watch } from 'vue'
import { introduces } from '@/api/constant.js'
import { useRoute } from 'vue-router'
export default {
  name: 'MyFooter',
  setup () {
    const introduce = ref(introduces.main)
    const route = useRoute()
    const current = ref(route.path.slice(1))
    watch(() => route.path, (newVal) => {
      if (newVal === '/') {
        introduce.value = introduces.main
        return
      }
      current.value = newVal.slice(1)
      introduce.value = introduces[current.value]
    }, { immediate: true })
    return { introduce }
  }
}
</script>

<style scoped lang="less">
.app-footer {
  //overflow: hidden;
  padding-top: 0px;
  //height: 1000px;
  .contact {
    background: #fff;

    .container {
      padding: 10px 0 10 10;
      display: flex;
      flex-direction: column;
    }

    dl {
      //height: 50px;
      text-align: center;
      padding: 0 0px;
      border-bottom: 1px solid black;
      //color: #999;
      color: black;
      font-family: "Microsoft JhengHei", fantasy;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
  }
}</style>
