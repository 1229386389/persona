<template>
  <!-- 搜索框 -->
  <div ref="target">
    <el-input v-model="input" placeholder="请输入想要查找的城市" class="input-with-select" @input="changeResult">
      <template #prepend>
        <el-button :icon="Search" />
      </template>
      <template #append v-if="type === 'search'">
        <el-button @click="changeCity">搜索</el-button>
      </template>
    </el-input>
    <div class="result slider" v-show="input">
      <ul>
        <li v-for="city in citys" :key="city.id" @click="select(city)"><el-icon :size="20">
            <ZoomIn />
          </el-icon><span>{{ city.adm1 }}</span><span>{{ city.name }}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { findCity } from '@/api/table.js'
import { ElMessage } from 'element-plus'
import { onClickOutside } from '@vueuse/core'
import { useStore } from 'vuex'
export default {
  name: 'citySearch',
  emits: ['cityChange'],
  props: {
    type: {
      type: String,
      default: 'search'
    }
  },
  setup (props, { emit }) {
    // const active = ref(false) // 显示搜索框
    const store = useStore()
    const input = ref(store.state.user.profile.city.name) // 输入框内容
    const current = ref(store.state.user.profile.city) // 当前选择项
    const citys = ref([])
    const changeResult = () => { // 请求城市数据
      findCity({
        location: input.value
      }).then((data) => {
        citys.value = data.location
      })
    }
    onMounted(() => { // 初始化表格
      if (props.type !== 'persona') {
        changeResult()
        changeCity()
      }
    })
    const changeCity = () => {
      if (!current.value) { // 如果没有选择则不搜索
        return ElMessage('请选择一个城市后再搜索')
      }
      if (props.type !== 'persona') {
        input.value = ''
        emit('cityChange', current.value)
      }
      current.value = null
    }
    const select = (curr) => { // 选择搜索项
      input.value = curr.name
      current.value = curr
      citys.value = []
      if (props.type === 'persona') { // 如果父组件是个人中心则触发事件传值
        emit('cityChange', current.value)
      }
    }
    const target = ref(null)
    onClickOutside(target, (event) => { // 点击搜索外面元素关闭
      citys.value = []
    })
    return { input, Search, citys, changeCity, changeResult, select, target }
  }
}
</script>
<style lang="less" scoped>
.result {
  position: relative;
  border-top: 1px solid rgb(239, 235, 235);
  border-left: 1px solid rgb(239, 235, 235);
  border-right: 1px solid rgb(239, 235, 235);
  // background: rgb(162, 161, 159);
  border-radius: 0px 0px 10px 10px;
  // width: inherit;
  overflow: visible;
  margin-top: 0px;
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.2);

  ul {
    li {
      width: 100%;
      list-style-type: none;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        margin-left: 0px;
      }

      span {
        margin-right: 4px;
        color: rgb(106, 104, 104);
      }

      * {
        margin-bottom: 5px;
        margin-left: 5px;
      }
    }
  }

}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.slider {
  animation-duration: .3s;
  animation-name: slidein;
  // animation-direction: reverse
}

@keyframes slidein {
  from {
    height: 0%;
    margin-top: -10px;
    // transform: rotate3d(0, 0, 0, 180deg)
  }

  to {
    height: 100%;
    margin-top: 0%;
  }

}
</style>
