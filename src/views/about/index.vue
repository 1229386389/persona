<template>
  <div id="print">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="slider">介绍</span>
          <div>
            <el-button class="button text" @click="getImage">惊喜</el-button>
            <el-button class="button text" icon="Printer" v-print="print"></el-button>
          </div>
        </div>
      </template>
      <div class="text item slider">
        一名前端开发者，倾向于对日开发
      </div>
      <!-- 使用动画组件 -->
      <el-button v-show="images" class="button" text @click="images = null">消除</el-button>
      <Transition name="slide-fade">
        <!-- 瀑布流组件 -->
        <picture-waterfal v-show="images" :images="images"></picture-waterfal>
      </Transition>
    </el-card>
    <!-- 标签 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="slider">属于我的标签</span>
        </div>
      </template>
      <div class="text item slider img-wrapper">
        <tag-item v-for="(tag, index) in tags" :key="index" :name="tag"></tag-item>
      </div>
    </el-card>
  </div>
</template>
<script>
import { randomImage } from '@/api/about'
import pictureWaterfal from './components/PictureWaterfal.vue'
import { ref } from 'vue'
import TagItem from './components/tagItem.vue'
import { tags } from '@/api/constant'
export default {
  name: 'MyAbout',
  components: { pictureWaterfal, TagItem },
  setup () {
    const images = ref(null)
    const getImage = () => {
      // 清空
      images.value = null
      randomImage().then((data) => { // 获取图片
        images.value = data.item
      })
    }
    const print = ref({
      id: 'print',
      extraHead: '简介',
      preview: true
    })
    return { images, getImage, tags, print }
  }
}
</script>
<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 95%;
  margin: 5px 5px;
}

.out {
  animation-direction: reverse
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.img-wrapper {
  column-count: 4;
  column-gap: 10px;
  counter-reset: count;
  margin: 0 auto;
}
</style>
