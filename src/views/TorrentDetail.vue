<template>
  <el-drawer v-model="show" :with-header="false" direction="rtl" size="580">

    <el-text size="large" truncated>
      {{ torrentInfo?.name }}
    </el-text>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Props" name="first">
        <TorrentPropsComponent v-model="torrentInfo"></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting" name="second">
        <TorrentSettingComponent v-model="torrentInfo"></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files" name="third">Role</el-tab-pane>

      <el-tab-pane label="Other" name="fourth">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import { TorrentInfo } from "@/util"
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue'
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue'

const show = defineModel<boolean>('show')
const torrentInfo = defineModel<TorrentInfo>('torrentInfo')

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>