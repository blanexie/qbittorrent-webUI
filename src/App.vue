<template>
  <LoginView v-if="store.globalPreference.loginShow"></LoginView>
  <HomeView v-if="!store.globalPreference.loginShow"></HomeView>
</template>
<script lang="ts" setup>
import StoreDefinition from "@/stores";
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

const store = StoreDefinition()

if (sessionStorage.getItem("loginOk")) {
  store.globalPreference.loginShow = false
}

</script>
<style scoped></style>
