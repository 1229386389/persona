
<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () { // render和h即使用js来渲染html模板
    const slots = this.$slots.default()// default是指除了具名插槽以外的所有内容。 具名为.header
    const arr = []
    const slotsIndex = slots.reduce((prev, curr) => { // 获取xtxitem的个数
      if (curr.type.name === 'XtxBreadItem') {
        return prev + 1
      }
      return prev
    }, 0)
    slots.forEach((item, index) => {
      arr.push(item)
      if (index < slotsIndex - 1) { // 如果不是最后一个元素则多渲染一个图标
        arr.push(h('i', { class: 'iconfont icon-xiangzuojiantou' }))
      }
    })
    // h/createElement中三个参数 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。类型：{String | Object | Function}。必需。
    // 一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。类型：{Object}。可选。
    // 子虚拟节点 (VNodes)，由 createElement() 构建而成，也可以使用字符串来生成“文本虚拟节点”。类型：{String | Array}。可选。
    return h('div', { class: 'xtx-bread' }, arr)
  }
}
</script>

<style scoped lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: rgb(225, 225, 225);
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
