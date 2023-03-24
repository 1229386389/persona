<template>
  <div class="main">
    <VueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true"
                :full="option.full" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :can-move="option.canMove"
                :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
                :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
                :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" :high="option.high" mode="cover"
                :max-img-size="option.max"></VueCropper>
    <div class="tools">
      <el-button @click="cropper.rotateLeft()" type="primary">左旋转</el-button>
      <el-button @click="cropper.rotateRight()" type="primary">右旋转</el-button>
      <el-button @click="useOriginal" type="primary">使用原图比例</el-button>
      <el-button @click="getData('base')" type="success">上传(base64)</el-button>
      <el-button @click="getData('blob')" type="success">上传(Blob)</el-button>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { VueCropper } from 'vue-cropper'
// import { reactive } from 'vue'
// import { UploadFile } from 'element-plus'
export default {
  name: 'ImgCropper',
  components: { VueCropper },
  emits: ['complete'],
  props: {
    src: {
      type: String, Object
    }
  },
  setup (props, { emit }) {
    const cropper = ref(null)
    const option = reactive({
      img: props.src,
      size: 1,
      full: false,
      outputType: 'jpeg',
      canMove: false,
      fixedBox: false,
      original: false,
      canMoveBox: true,
      autoCrop: true,
      // 只有自动截图开启 宽度高度才生效
      autoCropWidth: 150,
      autoCropHeight: 150,
      centerBox: true,
      high: true,
      max: 99999,
      fixed: false,
      canScale: true
    })
    const useOriginal = () => { // 使用原图比例
      delete option.autoCropWidth
      delete option.autoCropHeight
    }
    const getData = (type) => { // 获取图片的base64
      if (type === 'base') { // base64
        cropper.value.getCropData(data => {
          emit('complete', data)
        })
      } else if (type === 'blob') { // blob
        cropper.value.getCropBlob(data => {
          emit('complete', data)
        })
      }
    }
    return { option, cropper, getData, useOriginal }
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 90%;
  height: 400px;
}

.tools {
  float: left;
  margin: 5px 20px;
}
</style>
