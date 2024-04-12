<template>
  <LoginView v-if="store.globalPreference.loginShow"></LoginView>
  <HomeView v-if="!store.globalPreference.loginShow"></HomeView>
</template>
<script lang="ts" setup>
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import StoreDefinition from "@/stores"

const store = StoreDefinition()

if (sessionStorage.getItem("loginOk")) {
  store.globalPreference.loginShow = false
}

</script>
<style scoped></style>
