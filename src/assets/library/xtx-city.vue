<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span class="placeholder" v-if="!fullLocation">{{placeholder}}</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code+item.level" @click="changeItem(item)">{{
          item.name
        }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: () => null
    },
    placeholder: {
      type: String,
      default: '请选择配送地址'
    }
  },
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    // 控制城市数据加载
    const loading = ref(false)
    // 城市数据
    const cityData = ref([])
    const openDialog = () => {
      active.value = true
      // 数据开始加载
      loading.value = true
      getCity().then(({ data }) => { // 获取数据赋值给城市数据且停止加载
        cityData.value = data
        loading.value = false
      })
      // 清空之前的选择
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const closeDialog = () => {
      active.value = false
      cityData.value = []
    }
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog()
      else openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => { // onClickOutside检测在一个元素之外的任何点击
      closeDialog()
    })
    // 获取城市数据
    const getCity = () => {
      // 封装成promise对象
      return new Promise((resolve, reject) => {
        if (window.cityData) { // 如果有缓存的话
          resolve(window.cityData)
        } else { // 没有缓存
          const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios({ url }).then((result) => {
            window.cityData = result
            resolve(window.cityData)
          })
        }
      })
    }
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    const changeItem = (item) => { // 用户点击地址后
      if (item.level === 0) { // 省份
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
        closeDialog()
        emit('change', changeResult)
      }
      // if (item.level === 1) { // 城镇
      //   changeResult.cityCode = item.code
      //   changeResult.cityName = item.name
      // }
      // if (item.level === 2) {
      //   changeResult.countyCode = item.code
      //   changeResult.countyName = item.name
      //   changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
      //   closeDialog()
      //   emit('change', changeResult)
      // }
    }
    const currList = computed(() => {
      // 初始为省份
      let currList = cityData.value
      if (changeResult.provinceCode) { // 如果已点击省份 展示城市数据
        currList = currList.find((item) => {
          return item.code === changeResult.provinceCode
        }).areaList
        if (changeResult.cityCode) { // 如果已点击城市 展示区数据
          currList = currList.find((item) => {
            return item.code === changeResult.cityCode
          }).areaList
        }
      }
      return currList
    })
    return { active, toggleDialog, target, loading, currList, changeItem }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }

    .loading {
      height: 290px;
      width: 100%;
      background-image: url(@/assets/image/1.jpg);
    }
  }
}
</style>
