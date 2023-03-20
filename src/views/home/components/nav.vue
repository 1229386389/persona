<template>
  <div>
    <el-row class="nav">
      <div class="left">
        <el-icon>
          <SwitchFilled />
        </el-icon>
        <span v-if="$store.state.user.profile.token" @click="$router.push('/Info')"> {{ $store.state.user.profile.nickname }}的博客</span>
        <span v-else>登陆后显示</span>
      </div>
      <div class="right">
        <el-row>
          <!-- 登出按钮 -->
           <el-button type="primary" v-if="$store.state.user.profile.token" @click="$store.commit('user/loginout')" >登出</el-button>
           <!-- 登陆按钮 -->
            <el-button type="primary" @click="$router.push('/login')" class="top">登陆</el-button>
          <div class="Paperclip" @mouseleave="showData = false">
            <!-- 链接 -->
            <el-icon :size="40">
              <Paperclip />
            </el-icon>
            <!-- 弹出窗 -->
            <div class="fade">
              <i class="iconfont icon-QQ" @click="DataShow(0)"></i>
              <i class="iconfont icon-weixin" @click="DataShow(1)"></i>
              <el-link href="https://github.com/1229386389" target="_blank" class="el-link"><i
                   class="iconfont icon-github-fill" /></el-link>
              <!-- 显示qq和微信号 -->
              <div class="popup slider" v-if="showData">
                <span class="number">{{ number }}</span>
              </div>
            </div>
          </div>
          <!-- 全屏插件 -->
          <el-icon :size="40">
            <FullScreen @click="fullscreen" />
          </el-icon>
          <!-- 头像 -->
          <div style="margin-top:-6px;" v-if="$store.state.user.profile.token">
            <el-avatar  :src="$store.state.user.profile.avatar" :size="60" @click="showImg($store.state.user.profile.avatar)" />
          </div>
        </el-row>
      </div>
    </el-row>
    <!-- 传送到dialog容器中 -->
    <Teleport to="#dialog">
      <el-dialog v-model="visible">
        <qrcode-vue :value="$store.state.user.profile.avatar" :size="500" level="H" />
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
    const data = ['QQ:1229386389', 'WeiXin:Sad-Symboli_Rudolf']
    const showData = ref(false) // 是否展示号码
    const number = ref(null)
    const DataShow = (num) => {
      // 从数据中获取号码
      number.value = data[num]
      showData.value = true
    }
    onUnmounted(() => {
      showData.value = false
    })
    return { visible, content, showImg, fullscreen, showData, DataShow, data, number }
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
    font-family: "Microsoft JhengHei", fantasy;
    font-size: 30px;
    font-style: white;
  }

  .right {
    display: inline;

    * {
      margin-left: 10px;
      margin-top: 4px;
    }

    .Paperclip {
      margin-top: -1px;
    }

    .Paperclip:hover {
      .fade {
        opacity: 1;
      }
    }
   .top{
    background: 0;
   }
    .fade {
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
      &:hover {
        .fade {
          opacity: 1;
          transition: all .4s .2s;
          transform: translateY(10px);
        }
      }

      * {
        margin: 10px 10px;
      }

      >i:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      }

      .popup {
        margin-left: 0px;
        margin-top: -10px;
        width: 100%;
        height: 30px;
        background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
      }

      i {
        font-size: 30px;
      }

      .el-link {
        margin-top: -5px;
      }

      .number {
        font-size: 10px;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.slider {
  animation-duration: .3s;
  animation-name: slidein;
  // animation-direction: reverse
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 100%;
    font-size: 14px;
  }

  to {
    margin-left: 0%;
    width: 100%;
    // font-size: 14px;
  }

}</style>
