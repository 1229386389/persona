<template>
  <ul class="img-wrapper">
    <li v-for="image in images" :key="image.id"><img :src="image.src" alt=""></li>
  </ul>
</template>
<script>
export default {
  name: 'PictureWaterfal',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
  }
}
</script>
<style lang="less" scoped>
.img-wrapper {
  column-count: 4;
  column-gap: 10px;
  counter-reset: count;
  width: 960px;
  margin: 0 auto;
}

.img-wrapper>li {
  position: relative;
  margin-bottom: 10px;
 list-style-type: none;
}
.img-wrapper>li>img{
    width: 100%;
    height: auto;
    vertical-align: middle;
}

.img-wrapper>li::after{
    counter-increment: count;
    content: counter(count);
    width: 2em;
    height: 2em;
    background-color: rgba(0,0,0,0.9);
    color: #ffffff;
    line-height: 2em;
    text-align: center;
    position: absolute;
    font-size: 1em;
    z-index: 2;
    left: 0;
    top: 0;
}
</style>
