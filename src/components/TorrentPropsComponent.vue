<template>
  <ul>

    <li><span>InfoHash:</span><span>{{ globalInfo.currentTorrent?.hash }}</span></li>
    <li><span>添加时间:</span><span>{{ globalInfo.currentTorrent?.getTimeStr('added_on') }}</span></li>
    <li><span>剩余时间:</span><span>{{ globalInfo.currentTorrent?.getEtaStr() }}</span></li>
    <li><span>存储路径:</span><span>{{ globalInfo.currentTorrent?.content_path }}</span></li>
    <li><span>状态:</span><span>{{ globalInfo.currentTorrent?.state }}</span></li>
    <li><span>进度:</span><span>{{ globalInfo.currentTorrent?.getDownloadSizeStr() }}</span></li>
    <li><span>速度:</span>
      <span>
        <el-icon>
          <Bottom />
        </el-icon> {{ globalInfo.currentTorrent?.dlspeed.getSpeedStr() }}&nbsp;&nbsp;
        <el-icon>
          <Top />
        </el-icon> {{ globalInfo.currentTorrent?.upspeed.getSpeedStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </li>
    <li><span>限速:</span>
      <span>
        <el-icon>
          <Download />
        </el-icon> {{ globalInfo.currentTorrent?.dl_limit.getSpeedStr() }}&nbsp;&nbsp;
        <el-icon>
          <Upload />
        </el-icon> {{ globalInfo.currentTorrent?.up_limit.getSpeedStr() }}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </li>
    <li><span>分享率:</span><span>{{ globalInfo.currentTorrent?.ratio }}</span></li>
    <li><span>种子数:</span><span>{{ globalInfo.currentTorrent?.num_seeds }}</span></li>
    <li><span>吸血数:</span><span>{{ globalInfo.currentTorrent?.num_leechs }}</span></li>

    <li><span>顺序下载:</span><span>{{ globalInfo.currentTorrent?.seq_dl }}</span></li>
    <li><span>超级种子:</span><span>{{ globalInfo.currentTorrent?.super_seeding }}</span></li>
    <li><span>优先级:</span><span>{{ globalInfo.currentTorrent?.priority }}</span></li>

    <li><span>分类:</span><span>{{ globalInfo.currentTorrent?.category }}</span></li>
    <li><span>标签:</span><span>{{ globalInfo.currentTorrent?.tags }}</span></li>
  </ul>
</template>
<script lang="ts" setup>
import StoreDefinition from '@/stores';
import { Bottom, Download, Top, Upload } from '@element-plus/icons-vue';

const store = StoreDefinition()
const globalInfo = store.globalInfo

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