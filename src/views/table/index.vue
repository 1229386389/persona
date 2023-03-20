<template>
  <div class="main" v-loading="loading">
  <el-card>
    <span v-if="WeatherData">最后更新时间:<span class="title">{{ WeatherData.updateTime }}</span>当前显示<span
            class="title">{{curr.name || '北京'}}</span>
    今日天气:白天<span class="title">{{ WeatherData.daily[0].textDay }}</span>夜晚<span class="title">{{ WeatherData.daily[0].textNight }}</span>
    </span>
    <!-- 搜索组件 -->
    <citySearch @cityChange="locationChange" ></citySearch>
    </el-card>
    <el-card>
    <div ref="table" class="table"></div>
    </el-card>
    <el-card>
    <WeatherTable v-if="WeatherData" :tableData="WeatherData.daily"></WeatherTable>
    </el-card>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import { findWeather } from '@/api/table'
import citySearch from './components/search.vue'
import WeatherTable from './components/table.vue'
export default {
  name: 'MyTable',
  components: { citySearch, WeatherTable },
  setup () {
    const loading = ref(true)
    let myChart
    const { proxy } = getCurrentInstance() // 获取当前vue实例
    const table = ref(null)
    const WeatherReq = reactive({ // 请求参数
      location: '101010100', // 默认北京
      lang: 'zh' // 默认中文
    })
    const WeatherData = ref(null) // 天气数据
    const chartOption = () => { // 获取数据并且渲染图
      findWeather(WeatherReq).then((data) => {
        WeatherData.value = data
        myChart.setOption({ // 配置项
          title: {
            text: '未来七天天气详情'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.daily.map((item) => {
              const time = new Date(item.fxDate)
              return `${time.getDate()}号`
            })
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: '最高气温',
              type: 'line',
              data: data.daily.map((item) => { return item.tempMax }), // 从传来的数据中获取最高气温
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            },
            {
              name: '最低气温',
              type: 'line',
              data: data.daily.map((item) => { return item.tempMin }), // 从传来的数据中获取最低气温
              markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
              },
              markLine: {
                data: [
                  { type: 'average', name: 'Avg' },
                  [
                    {
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        position: 'start',
                        formatter: 'Max'
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ]
              }
            }
          ]
        })
        loading.value = false
      })
    }
    watch(WeatherReq, () => { // 请求参数发生改变时候重新请求
      chartOption()
    }, { immediate: true })
    const curr = ref({}) // 当前选择的城市
    const locationChange = (current) => { // 改变城市
      WeatherReq.location = current.id
      curr.value = current
    }
    onMounted(() => { // dom挂载后渲染图表
      myChart = proxy.$echarts.init(table.value)
      // chartOption(WeatherData)
      window.onresize = myChart.resize // 自适应屏幕
    })
    return { table, WeatherData, locationChange, curr, loading }
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 98%;

  * {
    margin-top: 20px;
  }

  >span {
    color: rgb(145, 145, 145);
  }

  .title {
    color: rgb(40, 49, 149);
    margin-left: 5px;
    margin-right: 5px;
  }

  .table {
    width: 100%;
    height: 400px;
  }
}
</style>
