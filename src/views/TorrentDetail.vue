<template>
  <el-drawer v-model="preference.showDetail" :with-header="false" @open="beforeLeave" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ preference.currentTorrent?.name }}
    </el-text>

    <el-tabs @tab-change="beforeLeave" v-model="active">
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
import TorrentContentComponent from '@/components/TorrentContentComponent.vue';
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import TorrentTrackerComponent from '@/components/TorrentTrackerComponent.vue';
import StoreDefinition from '@/stores';
import {ref} from 'vue';
import {Torrent} from "@/util";

const store = StoreDefinition()
const preference = store.globalPreference
const active = ref("Props")

const beforeLeave = () => {
  const torrent = preference.currentTorrent
  if (torrent == null) {
    return
  }
  if (torrent instanceof Torrent) { /* empty */
  } else {
    return;
  }
  if (active.value == "Files") {
    store.fetchFiles(torrent)
  }
  if (active.value == "Setting") {
    store.fetchCategoryAndTags()
  }
  if (active.value == 'Trackers') {
    store.fetchTracker(torrent)
  }
}


</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>