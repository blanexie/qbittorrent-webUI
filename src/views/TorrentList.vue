<template>
  <ul>
    <li v-for="t in storeDefinition.torrentInfos" v-bind:key="t.hash" @click="handleClick(t as TorrentInfo)"
        :class="{ 'border-color': t.isActive }">

      <div class="p1">
        <span class="li-left">{{ t.name }}</span>
        <span class="li-right" @click="showDetail(t as TorrentInfo)">
          <el-icon>
            <Close />
          </el-icon>
          <el-icon>
            <VideoPlay />
          </el-icon>
          <el-icon>
            <VideoPause />
          </el-icon>
        </span>
      </div>

      <div class="p2">
        <el-progress :percentage="t.getProgress()" :text-inside="true" :status="t.progress == 1 ? 'success' : ''">
          <span> </span>
        </el-progress>
      </div>

      <div class="p3">
        <span class="li-left">{{ t.getDownloadSizeStr() }}
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

  <div> more</div>

  <TorrentDetail v-model:show="show" v-model:torrent-info="detail" />

</template>
<script setup lang="ts">
import StoreDefinition from '@/stores'
import { TorrentInfo } from '@/util'
import TorrentDetail from '@/views/TorrentDetail.vue'
import { Close, VideoPause, VideoPlay } from '@element-plus/icons-vue'
import { ref } from 'vue'

const storeDefinition = StoreDefinition()
const detail = ref<TorrentInfo>()
const show = ref<boolean>(false)

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
  background-color: #f4f1fc;
  border: 1px solid #5d5de8 !important;
}

ul {
  list-style-type: none;
  padding-inline-start: 0;
  min-width: 500px;

  li {
    margin-bottom: 20px;
    border: 1px solid #909399;
    border-radius: 10px;
    padding: 10px;

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
      .el-icon {
        margin: 0 5px;
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
    border: 1px solid #5d5de8;
  }

}
</style>