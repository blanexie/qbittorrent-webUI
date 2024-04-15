<template>
  <el-drawer v-model="show" :with-header="false" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ torrent?.name }}
    </el-text>

    <el-tabs v-model="activeName">
      <el-tab-pane label="Props" name="first">
        <TorrentPropsComponent></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting" name="second">
        <TorrentSettingComponent></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files" name="third">Role</el-tab-pane>

      <el-tab-pane label="Other" name="fourth">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import { TorrentInfo } from '@/util';
import { provide, ref } from 'vue';
const show = defineModel<boolean>("show")
const torrent = defineModel<TorrentInfo>("torrent")
provide("torrent", torrent)
console.log("tttt", torrent)


const activeName = ref('first')
</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>