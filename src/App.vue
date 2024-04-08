<template>
  <LoginView v-if="!loginShow" v-model="loginShow"></LoginView>
  <HomeView v-if="loginShow"></HomeView>
</template>
<script lang="ts" setup>
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import { ref } from "vue";

const loginShow = ref(false)
const ll = localStorage.getItem("cookie")
console.log("cookie", ll)
if (localStorage.getItem("cookie")) {
  loginShow.value = true
}

</script>
<style scoped></style>
