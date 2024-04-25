<template>
  <div class="toolbar">
    <el-tooltip content="退出登录" effect="light">
      <el-icon @click="logout">
        <SwitchButton/>
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全局设置" effect="light">
      <el-icon @click="settingClick">
        <Setting/>
      </el-icon>
    </el-tooltip>
    <el-tooltip content="新增下载" effect="light">
      <el-icon>
        <Plus/>
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全部开始" v-if="store.globalInfo.currentMenu == 'error'" effect="light">
      <el-icon @click="playOrStop()">
        <VideoPlay/>
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全部暂停" v-if="store.globalInfo.currentMenu == 'downloading'" effect="light">
      <el-icon @click="playOrStop()">
        <VideoPause/>
      </el-icon>
    </el-tooltip>
    <el-tooltip content="刷新" effect="light">
      <el-icon @click="refreshClick($event)">
        <Refresh/>
      </el-icon>
    </el-tooltip>

    <PreferenceComponent></PreferenceComponent>
  </div>
</template>
<script setup lang="ts">
import PreferenceComponent from "@/components/perference/PreferenceComponent.vue";
import { axios } from "@/requests";
import StoreDefinition from "@/stores";
import { Plus, Refresh, Setting, SwitchButton, VideoPause, VideoPlay } from "@element-plus/icons-vue";
import { ElIcon, ElMessage, ElTooltip } from "element-plus";


const store = StoreDefinition()

const settingClick= () => {
  store.globalPreference.show = true
}


const playOrStop = () => {
  console.log(store.globalInfo.currentMenu)

  if (store.globalInfo.currentMenu == 'error') {
    const hashs = store.torrentInfos.map(it => it.hash).join("|")
    const from = new FormData()
    from.set("hashes", hashs)
    axios.post('/api/v2/torrents/resume', from)
        .then(resp => {
          store.globalInfo.currentMenu = 'downloading'
        })
  }

  if (store.globalInfo.currentMenu == 'downloading') {
    const hashs = store.torrentInfos.map(it => it.hash).join("|")
    const from = new FormData()
    from.set("hashes", hashs)
    axios.post('/api/v2/torrents/pause', from)
        .then(resp => {
          store.globalInfo.currentMenu = 'error'
        })
  }

}

const logout = () => {
  axios.post("/api/v2/auth/logout").then(resp => {
    sessionStorage.removeItem("loginOk")
    window.location.href = "/"
  })
}

const refreshClick = (event: Event) => {
  store.globalInfo.rid = 0
  const element = event.target as HTMLElement;
  // 将元素旋转 360 度
  element.style.transform = 'rotate(360deg)';
  ElMessage.success("刷新成功")
}

</script>

<style scoped>
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: left;
  height: 100%;
  font-size: large;
}

.el-icon {
  margin-right: 20px;
  cursor: pointer;
}

.el-icon:hover {
  color: var(--border-color);
}
</style>
