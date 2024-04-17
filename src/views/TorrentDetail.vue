<template>
  <el-drawer v-model="show" :with-header="false" @open="openDrawer" direction="rtl" size="600">

    <el-text size="large" truncated>
      {{ torrent?.name }}
    </el-text>

    <el-tabs :before-leave="beforeLeave" v-model="active">
      <el-tab-pane label="Props" name="Props">
        <TorrentPropsComponent></TorrentPropsComponent>
      </el-tab-pane>

      <el-tab-pane label="Setting" name="Setting">
        <TorrentSettingComponent v-model="setting.data"></TorrentSettingComponent>
      </el-tab-pane>

      <el-tab-pane label="Files" name="Files">
        <TorrentContentComponent v-model="root.data"></TorrentContentComponent>
      </el-tab-pane>

      <el-tab-pane label="Tackers" name="Tackers">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentContentComponent from '@/components/TorrentContentComponent.vue';
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import { axios } from '@/requests';
import { TorrentFile, TorrentInfo, TorrentSetting } from '@/util';
import { ElMessage } from 'element-plus';
import { provide, reactive, ref } from 'vue';
const show = defineModel<boolean>("show")
const torrentInfo = defineModel<TorrentInfo>("torrent")
provide("torrent", torrentInfo)
const active = ref("Props")
const setting = reactive({
  data: new TorrentSetting(),
})

const root = reactive({
  data: new Array<TorrentFile>()
})

const openDrawer = () => {
  initSetting()

}

const beforeLeave = (activeName: string) => {
  if (activeName == "Files") {
    getFiles()
  }
}

const initSetting = () => {
  if (setting.data.firstOpen) {
    const torrent = torrentInfo.value!!
    setting.data.savePath = torrent.save_path
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
    setting.data.firstOpen = false
  }
}
const map = new Map<String, TorrentFile>()

const getFiles = () => {
  const hash = torrentInfo.value?.hash
  const url = '/api/v2/torrents/files?hash=' + hash + '&' + new Date().getTime()
  axios.get(url).then(resp => {
    root.data.length = 0
    const data = resp.data as Array<TorrentFile>
    buildTree(data)
    console.log("ssssssssssss", root.data)
  }).catch(error => {
    ElMessage.error("获取内容信息失败" + error)
  })
}

const buildTree = (files: TorrentFile[]) => {
  files.forEach(it => {
    console.log(it)
    it.isLeaf = true
    const name = it.name
    const [prefix, last] = splitPrefix(name)
    if (prefix == '') {
      root.data.push(it)
    } else {
      const p = findPrefix(prefix)
      it.name = last
      it.prefix = prefix
      p.children.push(it)
    }
  })
}

const findPrefix = (prefix: string): TorrentFile => {
  const v = map.get(prefix)
  if (v) {
    return v
  }
  const [p, l] = splitPrefix(prefix)
  const t = new TorrentFile(p, l)
  map.set(prefix, t)
  if (p == '') {
    root.data.push(t)
  } else {
    const t1 = findPrefix(p)
    t1.children.push(t)
  }
  return t
}

const splitPrefix = (name: string) => {
  const paths = name.split("/")
  if (paths.length == 1) {
    return ['', name]
  }
  if (paths.length == 2) {
    return [paths[0], paths[1]]
  }

  const last = paths[paths.length - 1]
  paths.length = paths.length - 1
  const prefix = paths.join("/")
  return [prefix, last]
}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>