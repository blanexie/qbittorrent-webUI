<template>
  <LoginView v-if="store.globalInfo.loginShow"></LoginView>
  <HomeView v-if="!store.globalInfo.loginShow"></HomeView>
</template>
<script lang="ts" setup>
import StoreDefinition from "@/stores";
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

const store = StoreDefinition()

if (sessionStorage.getItem("loginOk")) {
  store.globalInfo.loginShow = false
}

</script>
<style scoped></style>
