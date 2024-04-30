<template>
  <el-drawer v-model="preference.showDetail" :with-header="false" @open="openInit" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ preference.currentTorrent?.name }}
    </el-text>

    <el-tabs v-model="active">
      <el-tab-pane label="Props" name="Props">
        <TorrentPropsComponent></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting" name="Setting">
        <TorrentSettingComponent></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files" name="Files">
        <TorrentContentComponent></TorrentContentComponent>
      </el-tab-pane>

      <el-tab-pane label="Trackers" name="Trackers">
        <TorrentTrackerComponent></TorrentTrackerComponent>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentContentComponent from '@/components/TorrentContent.vue';
import TorrentPropsComponent from '@/components/TorrentProps.vue';
import TorrentSettingComponent from '@/components/TorrentSetting.vue';
import TorrentTrackerComponent from '@/components/TorrentTracker.vue';
import StoreDefinition from '@/stores';
import {ref} from 'vue';
import {Torrent} from "@/util";

const store = StoreDefinition()
const preference = store.globalPreference
const active = ref("Props")

const openInit = () => {
  const torrent = preference.currentTorrent
  if (torrent == null) {
    return
  }
  if (torrent instanceof Torrent) { /* empty */
  } else {
    return;
  }

  torrent.initSetting()
  store.fetchFiles(torrent)
  store.fetchCategoryAndTags()
  store.fetchTracker(torrent)
}


</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>