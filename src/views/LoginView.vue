<template>
  <div class="body-div">
    <el-form
        label-width="auto"
        :model="fromValue"
        style="max-width: 600px"
        class="from-card"
    >
      <el-form-item label="Name">
        <el-input v-model="fromValue.name" placeholder="admin"/>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="fromValue.password" type="password" placeholder="adminadmin"/>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="loginReq">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.body-div {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
}

.from-card {
  width: 300px;
  height: 370px;
}

</style>
<script setup lang="ts">
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {Authentication} from "@/requests";
import {useAuthStore} from "@/stores/pinia";

const authStore = useAuthStore()
const auth = Authentication(authStore)


const fromValue = reactive({
  name: "",
  password: ""
})

/**
 * 登录请求
 */
const loginReq = () => {
  //1. 检查参数填写是否正常
  if (fromValue.name.length >= 20 || fromValue.name.length <= 0) {
    ElMessage.error("用户名长度限定在20以内")
    return
  }
  if (fromValue.password.length >= 20 || fromValue.password.length <= 6) {
    ElMessage.error("密码长度必须在6到20之间")
    return
  }
  //2. 请求服务端
  auth.login(fromValue.name, fromValue.password)
      .then(resp => {
        authStore.setCookie(resp.data)
        authStore.setLoginShow(false)
      })
      .catch(error => {
        ElMessage.error("登录失败，" + error)
      })

}


</script>