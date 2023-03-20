<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>Welcome</h2>
      </div>
      <div class="formdata">
        <el-form ref="ruleFormRef" :model="form" status-icon :rules="rules" label-width="120px">
          <el-form-item label="手机号" prop="account" style="color:black">
            <el-input v-model="form.account" type="mobile" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="pass" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">
              提交
            </el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { login } from '@/api/login'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const checkAccount = (rule, value, callback) => { // 自定义验证规则
  if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('请输入正确的手机号'))
  return callback()
}
export default {
  name: 'MyLogin',
  setup () {
    const router = useRouter()
    const form = reactive({ // 表单数据
      password: '123456',
      account: '15279194146'
    })
    const checked = ref(false) // 是否记住密码
    const rules = { // 检验规则
      account: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: checkAccount, trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { max: 10, message: '不能大于10个字符', trigger: 'blur' }
      ]
    }
    const ruleFormRef = ref(null) // 表单对象
    const store = useStore()
    const submitForm = async () => { // 提交
      try {
        await ruleFormRef.value.validate() // 通过验证
        await login(form).then((data) => {
          ElMessage({ message: '登陆成功', type: 'success' })
          // 保存到vuex中
          store.commit('user/setUser', data.profile)
          router.push('/')
        })
      } catch (e) {
        ElMessage({ message: e, type: 'error' })
      }
    }
    const resetForm = () => { // 重置
      ElMessageBox.confirm(
        '你是否要重置该表单',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        ElMessage('重置成功')
        ruleFormRef.value.resetFields()
      }).catch((e) => {
        ElMessage({ message: e, type: 'error' })
      })
    }
    return { form, checked, rules, resetForm, submitForm, ruleFormRef }
  }
}
</script>

<style scoped lang="less">
.loginbody {
  width: 100%;
  // height: 100%;
  min-width: 1000px;
  background-image: url("@/assets/image/login3.jpg");
  background-size: 100% 100%;
  // background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  // background-clip: padding-box;
  // position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
  margin-left: 15%;
}

.formdata {
  color: black;
}

.logindata {
  width: 400px;
  height: 300px;
  //transform: translate(-50%);
  margin-left: 20%;
  // position: absolute;
}

.tool {
  margin-left: 15%;
  width: 80%;
  display: flex;
  justify-content: space-between;
  color: #ad3333;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: black;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
/deep/ .el-form-item__label {
  color: black;
  margin-left: 0px;
}
</style>
