<template>
  <div class="body-div">
    <el-form label-width="auto" :model="fromValue" style="max-width: 600px" class="from-card">
      <h1>
        <FlyIcon class="fly"></FlyIcon> Qbittorrent
      </h1> <br>
      <el-form-item label="用户名">
        <el-input v-model="fromValue.name" placeholder="admin" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="fromValue.password" type="password" placeholder="adminadmin" />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import FlyIcon from '@/components/icons/FlyIcon.vue';
import { axios } from '@/requests';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const fromValue = reactive({
  name: '',
  password: ''
})

/**
 * 登录请求
 */
const login = () => {
  //1. 检查参数填写是否正常
  if (fromValue.name.length >= 20 || fromValue.name.length <= 0) {
    ElMessage.error('用户名长度限定在20以内')
    return
  }
  if (fromValue.password.length >= 20 || fromValue.password.length <= 6) {
    ElMessage.error('密码长度必须在6到20之间')
    return
  }
  //2. 请求服务端
  const from = new FormData()
  from.set("username", fromValue.name)
  from.set("password", fromValue.password)
  axios.post('/api/v2/auth/login', from)
    .then(resp => {
      console.log(resp)
      if (resp.data == 'Fails.') {
        ElMessage.error('用户名或者密码错误')
      } else {
        sessionStorage.setItem("loginOk", "ok")
        router.push("/all")
      }
    })
    .catch(error => {
      ElMessage.error('登录失败，' + error)
      sessionStorage.removeItem("loginOk")
    })
}

</script>

<style scoped>
.body-div {
  width: 98vw;
  height: 90vh;
  justify-content: center;
  align-items: center;
  display: flex;
}

.from-card {
  border-radius: 10px;
  padding: 20px 40px 10px 40px;
  border: 1px solid var(--border-color);

  .fly {
    width: 40px;
    height: 40px;
  }
}
</style>