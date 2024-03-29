<template>
  <LoginView v-if="authStore.loginShow"></LoginView>
  <HomeView v-if="!authStore.loginShow"></HomeView>
</template>
<script lang="ts" setup>
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";

import {useAuthStore} from "@/stores/pinia";

const authStore = useAuthStore()

</script>
<style scoped>

</style>
