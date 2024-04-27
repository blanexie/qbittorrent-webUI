<template>
  <el-drawer v-model="globalInfo.showDetail" :with-header="false" @open="beforeLeave" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ globalInfo.currentTorrent?.name }}
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
import {axios} from '@/requests';
import StoreDefinition from '@/stores';
import {ElMessage} from 'element-plus';
import {ref} from 'vue';
import {mergeObj, Tracker} from "@/util";

const store = StoreDefinition()
const globalInfo = store.globalInfo
const active = ref("Props")

const beforeLeave = ( ) => {
  if (active.value == "Files") {
    // const tfiles = files2.map(it => it as TorrentFile)
    // globalInfo.refreshFiles(tfiles)
    scheduleRefreshFiles()
  }
  if (active.value == "Setting") {
    fetchTagsAndCategory()
  }
  if (active.value == 'Trackers') {
    fetchTracker()
  }
}


const fetchTracker = () => {
  const hash = globalInfo.currentTorrent?.hash
  const url = '/api/v2/torrents/trackers?hash=' + hash
  axios.get(url).then(resp => {
    globalInfo.trackers = resp.data.map((it: any) => mergeObj(new Tracker(), it))
  }).catch(err => {
    ElMessage.error("获取内容信息失败" + err)
  })

}


const scheduleRefreshFiles = () => {
  const hash = globalInfo.currentTorrent?.hash
  const url = '/api/v2/torrents/files?hash=' + hash + '&' + new Date().getTime()

  axios.get(url).then(resp => {
    globalInfo.refreshFiles(resp.data)
  }).catch(error => {
    ElMessage.error("获取内容信息失败" + error)
  })
}

const fetchTagsAndCategory = async () => {
  axios.get('/api/v2/torrents/categories').then(resp => {
    globalInfo.categories.length = 0
    Object.keys(resp.data).forEach(it => {
      globalInfo.categories.push(it)
    })
  }).catch(error => {
    ElMessage.error("获取分类失败" + error)
  })

  //获取所有的标签
  axios.get('/api/v2/torrents/tags').then(resp => {
    console.log(resp.data)
    globalInfo.tags = resp.data as string[]
  }).catch(error => {
    ElMessage.error("获取标签失败" + error)
  })
}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>