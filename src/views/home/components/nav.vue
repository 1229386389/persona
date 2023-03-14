<template>
  <div>
    <el-row class="nav">
      <div class="left">
        <el-icon><SwitchFilled /></el-icon>
        斯大林猫的博客
      </div>
      <div class="right">
        <el-row>
         <div class="Paperclip" @mouseleave="showData = false">
          <!-- 链接 -->
            <el-icon :size="40"><Paperclip /></el-icon>
          <!-- 弹出窗 -->
           <div class="fade" >
           <i class="iconfont icon-QQ" @click="DataShow(0)"></i>
           <i class="iconfont icon-weixin" @click="DataShow(1)"></i>
           <el-link href="https://github.com/1229386389" target="_blank" class="el-link"><i class="iconfont icon-github-fill"/></el-link>
           <!-- 显示qq和微信号 -->
           <div class="popup slider" v-if="showData">
           <span>{{ number }}</span>
           </div>
           </div>
        </div>
        <!-- 全屏插件 -->
        <el-icon :size="40">
          <FullScreen @click="fullscreen" />
        </el-icon>
        <!-- 头像 -->
        <div style="margin-top:-6px;">
          <el-avatar :src="url" :size="70" @click="showImg(url)" />
        </div>
        </el-row>
      </div>
    </el-row>
    <!-- 传送到dialog容器中 -->
    <Teleport to="#dialog">
      <el-dialog v-model="visible">
        <qrcode-vue :value="url" :size="500" level="H" />
      </el-dialog>
    </Teleport>
  </div>
</template>
<script>
import { onUnmounted, ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
export default {
  name: 'MyNav',
  components: {
    QrcodeVue
  },
  setup () {
    const visible = ref(false) // 控制弹窗
    const content = ref(null) // canvas dom 显示qrcode
    const url = 'https://img01.yzcdn.cn/vant/cat.jpeg'
    const showImg = (url) => { // 展示图片
      if (url) {
        visible.value = true
      } else {
        ElMessage.error('那你能弄个图片不')
      }
    }
    const fullscreen = () => { // 全屏
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        ElMessage.error('不支持全屏')
      }
    }
    const data = ['1229386389', 'Sad-Symboli_Rudolf']
    const showData = ref(false) // 是否展示号码
    const number = ref(null)
    const DataShow = (num) => {
      number.value = data[num]
      showData.value = true
    }
    onUnmounted(() => {
      showData.value = false
    })
    return { visible, content, showImg, url, fullscreen, showData, DataShow, data, number }
  }
}
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  height: 70px;
  background: linear-gradient(-72deg,
      rgb(48, 138, 151) 0%,
      rgb(6, 90, 163) 100%);

  .left {
    align-content: right;
    margin-left: 10px;
    margin-top: 10px;
    font-family: "Microsoft JhengHei",fantasy;
  }

  .right {
    display: inline;
  *{
    margin-left: 10px;
    margin-top: 4px;
  }
  .Paperclip{
    margin-top: -1px;
  }
  .Paperclip:hover{
    .fade{
    opacity: 1;
    }
  }
 .fade{
  position: absolute;
  left: -100px;
  width: 200px;
  height: 100px;
  opacity: 0;
  background: linear-gradient(-72deg,
      rgb(48, 138, 151) 0%,
      rgb(6, 90, 163) 100%);
  border: black 1px solid;
  border-radius: 10%;
  align-items: center;
  //left: 0px;
  //display: none;
    &:hover{
    .fade{
    opacity: 1;
    transition: all .4s .2s;
    transform: translateY(10px);
    }
  }
  *{
    margin: 10px 10px;
  }
  .popup{
    margin-left: 0px;
    margin-top: -10px;
    width: 100%;
    height: 30px;
   background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  }
  i{
    font-size: 30px;
  }
  .el-link{
  margin-top: -5px;
  }
 }
  }
}
.slider {
  animation-duration: 3s;
  animation-name: slidein;
  // animation-direction: reverse
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
    font-size: 14px;
  }

  50% {
    margin-left: 100%;
    width: 300%;
    font-size: 28px;
  }

  to {
    margin-left: 0%;
    width: 100%;
    // font-size: 14px;
  }

}
</style>
