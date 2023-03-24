<template>
  <div>
    <div class="title">
      <p>未来七天月相表</p>
      <el-button type="primary" class="out" @click="exportExcel">导出月相表</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" row-key="id" id="out-table">
      <el-table-column prop="fxDate" label="日期" width="180">
        <!-- 自定义表头 -->
        <template #header>
          <el-icon>
            <Timer />
          </el-icon><span>日期</span>
        </template>
      </el-table-column>
      <el-table-column prop="sunrise" label="日升" width="180">
        <template #header>
          <i class="iconfont icon-richu"></i><span>日升</span>
        </template>
      </el-table-column>
      <el-table-column prop="sunset" label="日落">
        <template #header>
          <i class="iconfont icon-rila"></i><span>日落</span>
        </template>
      </el-table-column>
      <el-table-column prop="moonrise" label="月升">
        <template #header>
          <i class="iconfont icon-yuechu"></i><span>月升</span>
        </template>
      </el-table-column>
      <el-table-column prop="moonset" label="月落">
        <template #header>
          <i class="iconfont icon-yuela"></i><span>月落</span>
        </template>
      </el-table-column>
      <el-table-column prop="moonPhase" label="月相">
        <template #header>
          <i class="iconfont icon-yejing"></i><span>月相</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import * as FileSaver from 'file-saver'
import { getCurrentInstance } from 'vue'
export default {
  name: 'WeatherTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const { proxy } = getCurrentInstance()
    // 导出表格  按钮点击后触发事件
    const exportExcel = () => {
      /* 从表生成工作簿对象 */
      const wb = proxy.$XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      const wbout = proxy.$XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          '月相.xlsx'
        )
      } catch (e) {
      }
      return wbout
    }
    return { exportExcel }
  }
}
</script>
<style lang="less" scoped>
.title {
  Font-weight: bold;
  font-size: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  display: flex;
  justify-content: space-between;
}

.out {
  margin-top: 3%;
}
</style>
