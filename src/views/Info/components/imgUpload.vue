<template>
  <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit='1' v-model:file-list="fileList"
             @change="upload" >
    <el-icon>
      <Plus />
    </el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <el-icon>
              <Download />
            </el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon>
              <Delete />
            </el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <imgCropper :src="dialogImageUrl" @complete="ImgComplete"></imgCropper>
  </el-dialog>
</template>
<script>
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
// import { UploadFile } from 'element-plus'
import imgCropper from './cropper.vue'
import { ElMessage } from 'element-plus'
const readImg = (file) => { // 将file对象转化成base64格式
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()
    reader.onload = function (e) {
      img.src = e.target.result
    }
    reader.onerror = function (e) {
      reject(e)
    }
    reader.readAsDataURL(file)
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function (e) {
      reject(e)
    }
  })
}
export default {
  name: 'ImgUpload',
  components: { Delete, Download, Plus, ZoomIn, imgCropper },
  emits: ['uploading', 'removeImg'],
  setup (props, { emit }) {
    const dialogImageUrl = ref('') // 弹窗剪辑url
    const dialogVisible = ref(false)
    const disabled = ref(false) // 是否禁用工具栏
    const fileList = ref([]) // 文件列表 用reactive莫名报错
    const handleRemove = (file) => { // 删除选定图片
      const index = fileList.value.indexOf((item) => {
        return item.uid === file.uid
      })
      fileList.value.splice(index, 1)
      emit('removeImg')
      ElMessage('删除成功')
    }

    const handlePictureCardPreview = async (file) => { // 弹窗剪辑
      // file对象转换成image对象
      const img = await readImg(file.raw)
      dialogImageUrl.value = img.src
      dialogVisible.value = true
    }

    const handleDownload = (file) => { // 下载
      emit('uploading', file.url)
    }
    const ImgComplete = (data) => { // 图片确认上传
      // 关闭弹窗并清空
      dialogImageUrl.value = ''
      dialogVisible.value = false
      emit('uploading', data)
    }
    const upload = (e) => {
      ElMessage({ message: '上传成功', type: 'success' })
    }
    return { dialogImageUrl, upload, ImgComplete, dialogVisible, disabled, handleRemove, handlePictureCardPreview, handleDownload, fileList }
  }
}
</script>
<style lang="less" scoped>
.dialog {
  height: 500px;
}
</style>
