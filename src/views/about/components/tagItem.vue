<template>
  <div>
    <div class="tag">{{ name }}</div>
  </div>
</template>
<script>
export default {
  name: 'tagItem',
  props: { name: { type: String, required: true } },
  setup () {
  }
}
</script>
<style lang="less" scoped>
.tag {
  Border-radius: 20%;
  width: 50px;
  height: 25px;
  margin: 10px 10px;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  text-align:center;
    transition: all .5s;
    font-family: "Microsoft JhengHei",fantasy;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

}

</style>
