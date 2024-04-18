<template>
  <ul>

    <li><span>InfoHash:</span><span>{{ torrent?.hash }}</span></li>
    <li><span>添加时间:</span><span>{{ torrent?.getTimeStr('added_on') }}</span></li>
    <li><span>剩余时间:</span><span>{{ torrent?.getEtaStr() }}</span></li>
    <li><span>存储路径:</span><span>{{ torrent?.content_path }}</span></li>
    <li><span>状态:</span><span>{{ torrent?.state }}</span></li>
    <li><span>进度:</span><span>{{ torrent?.getDownloadSizeStr() }}</span></li>
    <li><span>速度:</span>
      <span>
        <el-icon>
          <Bottom />
        </el-icon> {{ torrent?.dlspeed.getSpeedStr() }}&nbsp;&nbsp;
        <el-icon>
          <Top />
        </el-icon> {{ torrent?.upspeed.getSpeedStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </li>
    <li><span>限速:</span>
      <span>
        <el-icon>
          <Download />
        </el-icon> {{ torrent?.dl_limit.getSpeedStr() }}&nbsp;&nbsp;
        <el-icon>
          <Upload />
        </el-icon> {{ torrent?.up_limit.getSpeedStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </li>
    <li><span>分享率:</span><span>{{ torrent?.ratio }}</span></li>
    <li><span>种子数:</span><span>{{ torrent?.num_seeds }}</span></li>
    <li><span>吸血数:</span><span>{{ torrent?.num_leechs }}</span></li>

    <li><span>顺序下载:</span><span>{{ torrent?.seq_dl }}</span></li>
    <li><span>超级种子:</span><span>{{ torrent?.super_seeding }}</span></li>
    <li><span>优先级:</span><span>{{ torrent?.priority }}</span></li>

    <li><span>分类:</span><span>{{ torrent?.category }}</span></li>
    <li><span>标签:</span><span>{{ torrent?.tags }}</span></li>
  </ul>
</template>
<script lang="ts" setup>
import StoreDefinition from '@/stores';
import { Bottom, Download, Top, Upload } from '@element-plus/icons-vue';

const store = StoreDefinition()
const globalInfo = store.globalInfo
const torrent = globalInfo.currentTorrent

</script>
<style scoped>
ul {
  padding: 0;
  list-style-type: none;
}

li {
  height: 30px;

  span:first-child {
    display: inline-block;
    margin-right: 10px;
    width: 100px;
    text-align: right;
  }

}
</style>