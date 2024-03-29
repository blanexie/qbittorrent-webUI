<template>
  <el-drawer
      v-model="show"
      :title="torrentInfo?.name"
      direction="rtl"
      size="50%"
  >
    {{ torrentInfo?.hash}}
  </el-drawer>
</template>

<script setup lang="ts">
import {ref, reactive, inject} from 'vue'
import type {TorrentInfo} from "@/util/class";

const show = inject<boolean>("torrentInfoShow")
const torrentInfo = inject<TorrentInfo>("torrentInfo")









</script>