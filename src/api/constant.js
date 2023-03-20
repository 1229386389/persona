// 使用webpack的require.context动态加载文件夹下所有图片
const importFn = require.context('@/assets/image/tags', false, /\.jpg$/)
const imgs = []
importFn.keys().forEach((el) => {
  imgs.push(el.substring(2, el.length))
})
export const tags = [{ name: '运动', url: require('@/assets/image/tags/' + imgs[5]) }, { name: '骑行', url: require('@/assets/image/tags/' + imgs[3]) }, { name: '探店', url: require('@/assets/image/tags/' + imgs[4]) }, { name: '美食', url: require('@/assets/image/tags/' + imgs[0]) }, { name: '游戏', url: require('@/assets/image/tags/' + imgs[1]) }, { name: '阅读', url: require('@/assets/image/tags/' + imgs[2]) }]
export const introduces = {
  main: ['本项目使用的是elementPlus组件库构建,并且使用了一些其中的插件（组件库只使用了一些自己写比较麻烦的组件节省开发时间）', '导航栏的nav从左边开始分别是名字(登陆后显示，点击后进入个人信息界面), 登陆登出,我的联系方式链接以及图标, 全屏化, 头像（点击后会弹出图片二维码）', '左边的导航栏是根据路由表动态生成的，点击展开后会变透明并且出现说明文字，右边使用了自己写的一个时钟组件当时间变化时会有一个翻页的效果且下面的说明文字会随着路由变化', '如果未登陆的话只能访问关于路由，使用的是路由守卫进行拦截'],
  about: ['关于界面的文字使用了一个文字从大到小的动画', '在介绍里的惊喜点击后会弹出一个图片瀑布流，图片数据使用的是mockjs1的随机图片，且图片使用了懒加载,点击打印图标后会进入打印预览界面', '每个标签都有鼠标移动到上面的阴影动画，点击后弹出对应图片，图片引入使用的是require.context的导入文件夹的方式'],
  table: ['图表界面首先是使用echarts生成的图(屏幕自适应),让天气可以更加直观的显示', '天气数据使用的是和风天气提供的api，使用了查询未来天气和地理位置的接口，且可以切换城市显示，默认显示城市为当前登陆用户的城市', '表使用的是element的table组件,表头使用自定义且加上了图标'],
  login: ['登陆界面模拟了常用的登陆逻辑，手机号密码都有校验规则，直接登陆会报错', '登陆用户数据使用vuex和mockjs模拟，返回用户信息和token并且保存到vuex中', '登陆后相应组件（头像名字登出按钮等）会显示']
}
