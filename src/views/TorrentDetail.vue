<template>
  <el-drawer v-model="show" :with-header="false" @open="openDrawer" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ torrent?.name }}
    </el-text>

    <el-tabs>
      <el-tab-pane label="Props">
        <TorrentPropsComponent></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting">
        <TorrentSettingComponent v-model="setting.data"></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files">Role</el-tab-pane>

      <el-tab-pane label="Other">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import { TorrentInfo, TorrentSetting } from '@/util';
import { provide, reactive } from 'vue';
const show = defineModel<boolean>("show")
const torrentInfo = defineModel<TorrentInfo>("torrent")
provide("torrent", torrentInfo)

const setting = reactive({
  data: new TorrentSetting(),
  firstOpen: true
})

const openDrawer = () => {
  if (setting.firstOpen) {
    const torrent = torrentInfo.value!!
    setting.data.savePath = torrent.content_path
    setting.data.downloadLimit = torrent?.dl_limit.getSize()
    setting.data.downloadLimitUnit = torrent?.dl_limit.getUnit()
    setting.data.uploadLimit = torrent?.up_limit.getSize()
    setting.data.uploadLimitUnit = torrent?.up_limit.getUnit()
    setting.data.torrentName = torrent?.name
    setting.data.category = torrent?.category
    setting.data.tags = torrent?.tags.split(',')
    setting.data.sequential = torrent?.seq_dl
    setting.data.superSeed = torrent?.super_seeding
    setting.data.f_l_piece_prio = torrent?.f_l_piece_prio
    //记录首次打开
    setting.firstOpen = false
  }
}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>