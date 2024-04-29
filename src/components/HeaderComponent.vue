<template>
  <div class="toolbar">
    <el-tooltip content="退出登录" effect="light">
      <el-icon @click="logout">
        <SwitchButton />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全局设置" effect="light">
      <el-icon @click="settingClick">
        <Setting />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="新增下载" effect="light">
      <el-icon @click="addDownload">
        <Plus />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全部开始" v-if="preference.currentMenu == 'error'" effect="light">
      <el-icon @click="playOrStop('start')">
        <VideoPlay />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全部暂停" v-if="preference.currentMenu == 'downloading'" effect="light">
      <el-icon @click="playOrStop('stop')">
        <VideoPause />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="刷新" effect="light">
      <el-icon @click="refreshClick($event)">
        <Refresh />
      </el-icon>
    </el-tooltip>

    <PreferenceSetting></PreferenceSetting>
    <AddTorrent></AddTorrent>
  </div>
</template>
<script setup lang="ts">
import AddTorrent from "@/components/AddTorrent.vue";
import PreferenceSetting from "@/components/PreferenceSetting.vue";
import { axios } from "@/requests";
import StoreDefinition from "@/stores";
import { Plus, Refresh, Setting, SwitchButton, VideoPause, VideoPlay } from "@element-plus/icons-vue";
import { ElIcon, ElMessage, ElTooltip } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const store = StoreDefinition()
const preference = store.globalPreference

const settingClick = () => {
  preference.show = true
}
const addDownload = () => {
  preference.showTorrentAddView = true
}

const playOrStop = (p: string) => {
  const from = new FormData()
  if (route.path == 'all') {
    const hashs = preference.torrents
      .map(it => it.hash).join("|")
    from.set("hashes", hashs)
  } else {
    const hashs = preference.torrents
      .filter(it => it.getShowState() == route.path)
      .map(it => it.hash).join("|")
    from.set("hashes", hashs)
  }

  if (p == 'start') {
    axios.post('/api/v2/torrents/resume', from)
      .then(resp => {
        console.log("playOrStop", resp)
        router.push("/all")
      })
  }
  if (p == 'stop') {
    axios.post('/api/v2/torrents/pause', from)
      .then(resp => {
        console.log("playOrStop", resp)
        router.push("/all")
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
  preference.rid = 0
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
