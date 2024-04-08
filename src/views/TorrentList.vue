<template>
  <ul>
    <li v-for="t in storeDefinition.torrentInfos" v-bind:key="t.hash" @click="showDetail(t as TorrentInfo)">
      <div class="p1">
        <span class="li-left">{{ t.name }}</span>
        <span class="li-right">
          <el-icon><Close/></el-icon>
          <el-icon><VideoPlay/></el-icon>
          <el-icon><VideoPause/></el-icon>
        </span>
      </div>
      <div class="p2">
        <el-progress :percentage="Math.floor(t.progress*100)"></el-progress>
      </div>
      <div class="p3">
        <span class="li-left">{{ t.downloaded }}/{{ t.size }} </span>
        <span class="li-right">
          <el-icon><Bottom/></el-icon>{{ t.dlspeed  }}
          <el-icon><Top/></el-icon>{{ t.upspeed  }}
          <el-icon><Timer/></el-icon> {{ t.num_seeds }}
          <el-icon><Magnet/></el-icon>{{ t.num_seeds }}
          <el-icon><Link/></el-icon>{{ t.num_leechs }}
        </span>
      </div>
    </li>
  </ul>

  <div> more</div>

  <TorrentDetail v-model:show="show" v-model:torrent-info="detail"/>

</template>
<script setup lang="ts">
import {Bottom, Close, Magnet, Timer, Top, VideoPause, VideoPlay} from '@element-plus/icons-vue'
import TorrentDetail from '@/views/TorrentDetail.vue'
import {TorrentInfo} from '@/util'
import {ref} from 'vue'
import StoreDefinition from "@/stores";


const storeDefinition = StoreDefinition()
const detail = ref<TorrentInfo>()
const show = ref<boolean>(false)

const showDetail = (t: TorrentInfo) => {
  detail.value = t
  show.value = true
}

</script>
<style scoped>

ul {
  list-style-type: none;
  padding-inline-start: 0;
  min-width: 500px;


  li {
    margin: 5px 0;
    border: 1px solid #909399;
    border-radius: 10px;
    padding: 10px;

    div {
      height: auto;
      width: 100%;
      overflow: auto; /* 清除浮动 */

      .el-icon {
        vertical-align: middle;
        font-size: 16px;
        margin-left: 5px;
      }
    }

    .p1 {
      padding-right: 25px;

      .el-icon {
        margin: 0 5px;
      }
    }

    .p2 {
      height: 20px;
      margin-top: 7px;
    }

    .p3 {
      padding-right: 25px;
    }

    .li-left {
      float: left;
    }

    .li-right {
      float: right;
    }

  }
}


</style>