<template>
  <LoginView v-if="loginShow" v-model="loginShow"></LoginView>
  <HomeView v-if="!loginShow"></HomeView>
</template>
<script lang="ts" setup>
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import { ref } from 'vue';

const loginShow = ref(true)
if (sessionStorage.getItem("loginOk") == "ok") {
  loginShow.value = false
}

</script>
<style scoped></style>
