<template>
  <ul>
    <li v-for="t in  store.torrentInfos " v-bind:key="t.hash" @click="handleClick(t as TorrentInfo)"
      :class="{ 'border-color': t.isActive }">

      <div class="p1">
        <span class="li-left">
          {{ t.name }}
        </span>
        <span class="li-right">
          <el-tooltip content="删除" effect="light">
            <el-icon @click="showRemoveDialog(t as TorrentInfo)">
              <Close />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="开始" v-if="t.getCState() !== 'downloading'" effect="light">
            <el-icon @click="resume(t as TorrentInfo)">
              <VideoPlay />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="暂停" v-if="t.getCState() == 'downloading'" effect="light">
            <el-icon @click="pause(t as TorrentInfo)">
              <VideoPause />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="复制磁链" effect="light">
            <el-icon @click="copyLink(t as TorrentInfo)">
              <Connection />
            </el-icon>
          </el-tooltip>
          <el-tooltip content="详情" effect="light">
            <el-icon @click="showDetail(t as TorrentInfo)">
              <Warning />
            </el-icon>
          </el-tooltip>

        </span>
      </div>

      <div class="p2">
        <el-progress :percentage="t.getProgress()" :text-inside="true" :status="getProgressState(t as TorrentInfo)">
          <span> </span>
        </el-progress>
      </div>



      <div class="p3">
        <span class="li-left">{{ t.getDownloadSizeStr() }}
          &nbsp;&nbsp; 状态：{{ t.state }}
        </span>
        <span class="li-right">
          <span class='icon'>↓</span> {{ t.dlspeed.getSpeedStr() }}&nbsp;&nbsp;
          <span class='icon'>↑</span> {{ t.upspeed.getSpeedStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
          剩余时间：{{ t.getEtaStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
          做种：{{ t.num_seeds }}&nbsp;&nbsp;&nbsp;&nbsp;
          吸血：{{ t.num_leechs }}
        </span>
      </div>

    </li>
  </ul>

  <TorrentDetail v-model:show="show" v-model:torrent-info="detail" />

  <el-dialog v-model="dialogVisible" title="" width="500">
    &nbsp;&nbsp; 同时删除已下载的文件: &nbsp;<el-switch v-model="deleteFiles" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="remove">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script setup lang="ts">
import { axios } from '@/requests'
import StoreDefinition from '@/stores'
import { TorrentInfo } from "@/util"
import TorrentDetail from '@/views/TorrentDetail.vue'
import { Close, Connection, VideoPause, VideoPlay, Warning } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const store = StoreDefinition()
const detail = ref<TorrentInfo>()
const show = ref<boolean>(false)
const deleteFiles = ref<boolean>(false)
const deleteHash = ref<string>("")
const dialogVisible = ref<boolean>(false)


const getProgressState = (t: TorrentInfo): string => {
  if (t.getCState() == "downloading") {
    return ''
  }
  if (t.getCState() == "finish") {
    return 'success'
  }
  if (t.getCState() == "quene") {
    return 'warning'
  }
  if (t.getCState() == "error") {
    return 'exception'
  }
  return ''
}



const copyLink = (t: TorrentInfo) => {
  // 判断浏览器是否支持 Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(t.magnet_uri);
    ElMessage.success("磁力链接已经写入剪切板")
  } else {
    console.error('浏览器不支持 Clipboard API。');
  }
}


const showRemoveDialog = (t: TorrentInfo) => {
  dialogVisible.value = true
  deleteHash.value = t.hash
}

const remove = () => {
  const from = new FormData()
  from.set("hashes", deleteHash.value)
  from.set("deleteFiles", deleteFiles.value + "")
  axios.post('/api/v2/torrents/delete', from)
    .then(() => {
      dialogVisible.value = false
      deleteHash.value = ''
      store.globalInfo.rid = 0
    })

}

const resume = (t: TorrentInfo) => {
  const from = new FormData()
  from.set("hashes", t.hash)
  axios.post('/api/v2/torrents/resume', from)
    .then(resp => {

    })

}

const pause = (t: TorrentInfo) => {
  const from = new FormData()
  from.set("hashes", t.hash)
  axios.post('/api/v2/torrents/pause', from)
    .then(resp => {

    })
}

const showDetail = (item: TorrentInfo) => {
  if (detail.value) {
    detail.value.isActive = false
  }
  detail.value = item
  item.isActive = true
  //显示当前点击torrent的详情
  show.value = true
}

const handleClick = (item: TorrentInfo) => {
  if (detail.value) {
    detail.value.isActive = false
  }
  detail.value = item
  item.isActive = true
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
    border: 1px solid #91949a;
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