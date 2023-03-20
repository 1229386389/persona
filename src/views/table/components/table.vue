<template>
  <div>
    <p class="title">未来七天月相表</p>
    <el-table :data="tableData" border style="width: 100%"  row-key="id">
      <el-table-column prop="fxDate" label="日期" width="180" >
        <!-- 自定义表头 -->
          <template #header>
             <el-icon><Timer /></el-icon><span>日期</span>
           </template>
      </el-table-column>
      <el-table-column prop="sunrise" label="日升" width="180" >
          <template #header>
            <i class="iconfont icon-richu"></i><span>日升</span>
           </template>
      </el-table-column>
      <el-table-column prop="sunset" label="日落" >
          <template #header>
            <i class="iconfont icon-rila"></i><span>日落</span>
           </template>
      </el-table-column>
       <el-table-column prop="moonrise" label="月升" >
         <template #header>
            <i class="iconfont icon-yuechu"></i><span>月升</span>
           </template>
       </el-table-column>
        <el-table-column prop="moonset" label="月落" >
          <template #header>
            <i class="iconfont icon-yuela"></i><span>月落</span>
           </template>
        </el-table-column>
         <el-table-column prop="moonPhase" label="月相" >
          <template #header>
            <i class="iconfont icon-yejing"></i><span>月相</span>
           </template>
         </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'WeatherTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  setup () {
  }
}
</script>
<style lang="less" scoped>
.title{
  Font-weight:bold;
  font-size: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>
