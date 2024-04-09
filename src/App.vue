<template>
  <LoginView v-if="loginShow" v-model="loginShow"></LoginView>
  <HomeView v-if="!loginShow" v-model="loginShow"></HomeView>
</template>
<script lang="ts" setup>
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import { ref } from 'vue'

const loginShow = ref(false)

function getCookie(name: string): string | null {
  const cookieValue = document.cookie.match(`(^|;) *${name}=(.*?)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}

if (getCookie('SID')) {
  loginShow.value = false
}

</script>
<style scoped></style>
