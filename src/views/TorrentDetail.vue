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

      <el-tab-pane label="Files">
        <TorrentContentComponent v-model="root.data"></TorrentContentComponent>
      </el-tab-pane>

      <el-tab-pane label="Tackers">Task</el-tab-pane>

    </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import TorrentContentComponent from '@/components/TorrentContentComponent.vue';
import TorrentPropsComponent from '@/components/TorrentPropsComponent.vue';
import TorrentSettingComponent from '@/components/TorrentSettingComponent.vue';
import { TorrentFile, TorrentInfo, TorrentSetting } from '@/util';
import { files2 } from "@/util/test";
import { provide, reactive } from 'vue';
const show = defineModel<boolean>("show")
const torrentInfo = defineModel<TorrentInfo>("torrent")
provide("torrent", torrentInfo)

const setting = reactive({
  data: new TorrentSetting(),
})

const root = reactive({
  data: new Array<TorrentFile>()
})

const openDrawer = () => {
  initSetting()
  getFiles()
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


const getFiles = () => {
  const hash = torrentInfo.value?.hash
  const url = '/api/v2/torrents/files?hash=' + hash + '&' + new Date().getTime()

  const fs = files2.map(it => it as TorrentFile)
  root.data = buildTree(fs)

  console.log("11111111111111111111", JSON.stringify(root))

  // axios.get(url).then(resp => {
  //   torrentFiles.data = resp.data as Array<TorrentFile>
  // }).catch(error => {
  //   ElMessage.error("获取内容信息失败" + error)
  // })

}


const buildTree = (files: TorrentFile[]) => {
  const map = new Map<string, TorrentFile>()
  const root: TorrentFile[] = []
  files.forEach(it => {
    const name = it.name
    const [prefix, last] = splitPrefix(name)
    const p = findPrefix(prefix, root, map)
    it.name = last
    p.children.push(it)
  })
  const set = new Set<string>()
  return root.filter(it => {
    if (set.has(it.name)) {
      return false
    } else {
      set.add(it.name)
      return true
    }
  })

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



const findPrefix = (prefix: string, root: TorrentFile[], map: Map<string, TorrentFile>): TorrentFile => {
  let prefixV = map.get(prefix)
  if (prefixV) {
    return prefixV
  } else {
    const [prefixF, last] = splitPrefix(prefix)
    if (prefixF == '') {
      //先检查map中是否存在
      let file = map.get(last)
      if (file) {
        root.push(file)
      } else {
        file = new TorrentFile()
        file.name = last
        map.set(file.name, file)
      }
      return file
    } else {
      const pFile = findPrefix(prefixF, root, map)
      const file = new TorrentFile()
      pFile.children.push(file)
      file.name = last
      map.set(file.name, file)
      return file
    }
  }

}

</script>
<style scoped>
.el_drawer__body {
  padding-top: 0;
}
</style>