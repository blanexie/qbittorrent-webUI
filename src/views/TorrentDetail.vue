<template>
  <el-drawer v-model="show" :with-header="false" @open="openDrawer" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ torrent?.name }}
    </el-text>

    <el-tabs v-model="activeName">
      <el-tab-pane label="Props" name="first">
        <TorrentPropsComponent></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting" name="second">
        <TorrentSettingComponent v-model="setting"></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files" name="third">Role</el-tab-pane>

      <el-tab-pane label="Other" name="fourth">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import { TorrentInfo, TorrentSetting } from '@/util';
import { provide, reactive, ref } from 'vue';
const show = defineModel<boolean>("show")
const torrentInfo = defineModel<TorrentInfo>("torrent")
provide("torrent", torrentInfo)
const activeName = ref('first')
const setting = reactive(new TorrentSetting())

const openDrawer = () => {
  const torrent = torrentInfo.value!!
  setting.savePath = torrent.content_path
  setting.downloadLimit = torrent?.dl_limit.getSize()
  setting.downloadLimitUnit = torrent?.dl_limit.getUnit()
  setting.uploadLimit = torrent?.up_limit.getSize()
  setting.uploadLimitUnit = torrent?.up_limit.getUnit()
  setting.torrentName = torrent?.name
  setting.category = torrent?.category
  setting.tags = torrent?.tags.split(',')
  setting.sequential = torrent?.seq_dl
  setting.superSeed = torrent?.super_seeding
  setting.f_l_piece_prio = torrent?.f_l_piece_prio
}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>