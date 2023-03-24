<template>
  <div>
    <el-card body-style="" shadow="always">
      <template #header>
        <div class="top">
          <div>
            <i class="iconfont icon-xiangzuojiantou" @click="$router.push('/')"> </i>
            <p class="title">基本信息</p>
          </div>
          <div>
            <el-avatar :size="50" :src="$store.state.user.profile.avatar" />
            <span class="left">
              <i class="iconfont icon-yejing">已码三年</i>
              <p>欢迎您<span>{{ $store.state.user.profile.nickname }}</span></p>
            </span>
          </div>
        </div>
        <hr>
      </template>
      <!-- 表单 -->
      <el-form label-position="top" label-width="100px" :model="formLabelAlign" style="max-width: 460px" ref="Form"
               :rules="FormRules">
        <el-form-item label="昵称" class="text" prop="nickname">
          <el-input v-model="formLabelAlign.nickname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formLabelAlign.sex" class="m-2" placeholder="选择性别">
            <el-option v-for="(item, index) in ['男', '女']" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="formLabelAlign.id" />
        </el-form-item>
        <el-form-item label="联系方式" prop="account">
          <el-input v-model="formLabelAlign.account" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="formLabelAlign.password" />
        </el-form-item>
        <el-form-item label="所在地区">
          <CitySerach type="persona" @cityChange="formLabelAlign.city = $event">
          </CitySerach>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="formLabelAlign.info" />
        </el-form-item>
        <el-form-item label="头像上传剪切">
          <img-upload @uploading="ImgShow" @removeImg="img = ''"></img-upload>
        </el-form-item>
      </el-form>
      <div>
      <span v-if="img">
    裁剪后图片
    <img  :src="img" alt="错误">
    裁剪后base/url
     <el-input
    v-model="img"
    autosize
    type="textarea"
    placeholder="裁剪图片后生成的base64/Blob地址,因为用户信息是使用本地数据所以无法更改用户头像(腾讯云os存储太贵了"
      />
      </span>
      </div>
    </el-card>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import CitySerach from '@/views/table/components/search.vue'
import { getAllUser } from '@/api/user.js'
import { useStore } from 'vuex'
import imgUpload from './components/imgUpload.vue'
import { ElMessage } from 'element-plus'
const sameNameCheck = async (rule, value, callback) => { // 检测昵称或者id是否相同
  const { users } = await getAllUser()
  const result = users.find((item) => {
    return item.nickname === value
  })
  if (result) { // 找到昵称相同的
    callback(new Error('该昵称已存在'))
  } else {
    callback()
  }
}
const sameIdCheck = async (rule, value, callback) => { // 检测昵称或者id是否相同
  const { users } = await getAllUser()
  const result = users.find((item) => {
    return item.id === value
  })
  if (result) { // 找到昵称相同的
    callback(new Error('该id已存在'))
  } else {
    callback()
  }
}
const sameAccountCheck = async (rule, value, callback) => { // 检测昵称或者id是否相同
  const { users } = await getAllUser()
  const result = users.find((item) => {
    return item.account === value
  })
  if (result) { // 找到昵称相同的
    callback(new Error('该手机号已存在'))
  } else {
    callback()
  }
}
export default {
  name: 'PersonalCenter',
  components: { CitySerach, imgUpload },
  setup () {
    const FormRules = reactive({ // 校验规则
      nickname: [{ required: true, message: '不能为空', trigger: 'blur' },
        { validator: sameNameCheck, trigger: 'blur' }],
      id: [{ required: true, message: '不能为空', trigger: 'blur' },
        { validator: sameIdCheck, trigger: 'blur' }],
      account: [{ required: true, message: '不能为空', trigger: 'blur' },
        { validator: sameAccountCheck, trigger: 'blur' }]
    })
    const img = ref('') // 裁剪好的图片
    const ImgShow = (data) => { // cropper裁剪图片回传
      img.value = data
      ElMessage({ message: '上传成功', type: 'success' })
    }
    const store = useStore()
    const formLabelAlign = reactive(store.state.user.profile)
    return { formLabelAlign, FormRules, ImgShow, img }
  }
}
</script>
<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;

  .left {
    margin-top: 0px;
    float: right;

    p {
      margin-top: 0px;
    }

    span {
      margin-left: 2px;
      color: rgb(89, 89, 118);
    }
  }
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.el-card__body {
  background: rgb(234, 234, 234);
}

.text {
  margin-right: 20px;
  float: left;
}
</style>
