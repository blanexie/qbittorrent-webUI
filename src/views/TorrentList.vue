<template>
  <ul>
    <li v-for="t in store.showTorrents" v-bind:key="t.hash" @click="active(t as Torrent)"
      :class="{ 'border-color': t.isActive }">

      <div class="p1">
        <span class="li-left">
          {{ t.name }}
        </span>
        <span class="li-right">
          <el-tooltip content="删除" effect="light">
            <el-icon @click="showRemoveDialog(t as Torrent)">
              <Close />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="开始" v-if="t.getShowState() !== 'downloading'" effect="light">
            <el-icon @click="resume(t as Torrent)">
              <VideoPlay />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="暂停" v-if="t.getShowState() == 'downloading'" effect="light">
            <el-icon @click="pause(t as Torrent)">
              <VideoPause />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="复制磁链" effect="light">
            <el-icon @click="copyLink(t as Torrent)">
              <Connection />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="详情" effect="light">
            <el-icon @click="showDetail(t as Torrent)">
              <Warning />
            </el-icon>
          </el-tooltip>
        </span>
      </div>

      <div class="p2">
        <el-progress :percentage="t.getProgress()" :text-inside="true" :status="getProgressState(t as Torrent)">
          <span> </span>
        </el-progress>
      </div>

      <div class="p3">
        <span class="li-left">{{ t.getProgress() * 100 }}%
          (
          <size-text v-model="t.completed"></size-text>
          /
          <size-text v-model="t.total_size"></size-text>
          )
          &nbsp;&nbsp; 状态：{{ t.state }}
        </span>
        <span class="li-right">
          <span class='icon'>↓</span> <speed-text v-model="t.dlspeed"></speed-text> &nbsp;&nbsp;
          <span class='icon'>↑</span> <speed-text v-model="t.upspeed"></speed-text> &nbsp;&nbsp;&nbsp;&nbsp;
          剩余时间：{{ t.getEtaStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
          做种：{{ t.num_seeds }}&nbsp;&nbsp;&nbsp;&nbsp;
          吸血：{{ t.num_leechs }}
        </span>
      </div>
    </li>
  </ul>

  <TorrentDetail />

  <el-dialog v-model="deleteDialog.visible" title="" width="500">
    &nbsp;&nbsp; 同时删除已下载的文件: &nbsp;<el-switch v-model="deleteDialog.deleteFiles" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="remove">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script setup lang="ts">
import SizeText from "@/components/SizeText.vue";
import SpeedText from "@/components/SpeedText.vue";
import { axios } from '@/requests';
import StoreDefinition from '@/stores';
import type { Torrent } from "@/util";
import TorrentDetail from '@/views/TorrentDetail.vue';
import { Close, Connection, VideoPause, VideoPlay, Warning } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

const store = StoreDefinition()
const preference = store.globalPreference

const showDetail = (t: Torrent) => {
  preference.currentTorrent = t
  preference.showDetail = true
}

const deleteDialog = reactive({
  deleteFiles: true,
  hash: '',
  visible: false
})

const active = (t: Torrent) => {
  preference.torrents.forEach(it => it.isActive = false)
  t.isActive = true
}


const getProgressState = (t: Torrent): string => {
  if (t.getShowState() == 'downloading') {
    return ''
  }
  if (t.getShowState() == 'finish') {
    return 'success'
  }
  if (t.getShowState() == 'quene') {
    return 'warning'
  }
  if (t.getShowState() == 'error') {
    return 'error'
  }
  return ''
}

const copyLink = (t: Torrent) => {
  // 判断浏览器是否支持 Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(t.magnet_uri)
    ElMessage.success('磁力链接已经写入剪切板')
  } else {
    ElMessage.error('浏览器不支持 Clipboard API。')
  }
}

const showRemoveDialog = (t: Torrent) => {
  deleteDialog.visible = true
  deleteDialog.hash = t.hash
}

const remove = () => {
  const from = new FormData()
  from.set('hashes', deleteDialog.hash)
  from.set('deleteFiles', String(deleteDialog.deleteFiles))
  axios.post('/api/v2/torrents/delete', from)
    .then(() => {
      deleteDialog.visible = false
      deleteDialog.hash = ''
      preference.rid = 0
    })
}

const resume = (t: Torrent) => {
  const from = new FormData()
  from.set('hashes', t.hash)
  axios.post('/api/v2/torrents/resume', from)
    .then(resp => {
      console.log("resume torrent  " + t.name, resp)
    })
}

const pause = (t: Torrent) => {
  const from = new FormData()
  from.set('hashes', t.hash)
  axios.post('/api/v2/torrents/pause', from)
    .then(resp => {
      console.log("pause torrent  " + t.name, resp)
    })
}

</script>
<style scoped>
.border-color {
  border: 1px solid var(--border-color) !important;
}

ul {
  list-style-type: none;
  padding-inline-start: 0;
  min-width: 600px;
  max-width: 980px;

  li {
    margin-bottom: 20px;
    border: 1px solid #b5b5b4;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    div {
      height: auto;
      width: 100%;
      overflow: auto;
      /* 清除浮动 */

      .el-icon {
        vertical-align: middle;
        font-size: 16px;
        margin-left: 5px;
      }
    }

    .p1 {
      .li-right {
        display: flex;
        align-items: center;
        border-radius: 15px;
        height: 32px;
        padding: 0 10px;
        border: 1px solid #e4e7ea;

        .el-icon {
          margin: 0 10px;
          height: 20px !important;
          width: 20px !important;
        }
      }

      .li-right:hover {
        background-color: var(--border-color);
        color: white;
      }
    }

    .p2 {
      padding-top: 10px;
    }

    .p3 {
      margin-top: 5px;
      padding-right: 5px;
      font-size: 12px;
      color: #979795;

      .icon {
        font-size: 14px;
      }
    }

    .li-left {
      float: left;
    }

    .li-right {
      float: right;

    }

  }

  li:hover {
    border: 1px solid var(--border-color);
  }

}
</style>