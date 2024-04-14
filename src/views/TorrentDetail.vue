<template>
  <el-drawer v-model="show" :with-header="false" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ store.globalInfo.currentTorrent?.name }}
    </el-text>

    <el-tabs v-model="activeName">
      <el-tab-pane label="Props" name="first">
        <TorrentPropsComponent> </TorrentPropsComponent>
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
import StoreDefinition from '@/stores';
import { ref } from 'vue';

const store = StoreDefinition()
const show = defineModel<boolean>('show')
const activeName = ref('first')


</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>