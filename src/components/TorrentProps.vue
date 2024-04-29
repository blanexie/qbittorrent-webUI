<template>
  <ul>

    <li><span>InfoHash:</span><span>{{ preference.currentTorrent?.hash }}</span></li>
    <li><span>添加时间:</span><span>{{ preference.currentTorrent?.getAddOnStr() }}</span></li>
    <li><span>剩余时间:</span><span>{{ preference.currentTorrent?.getEtaStr() }}</span></li>
    <li><span>存储路径:</span><span>{{ preference.currentTorrent?.content_path }}</span></li>
    <li><span>状态:</span><span>{{ preference.currentTorrent?.state }}</span></li>
    <li><span>进度:</span><span>{{ preference.currentTorrent!.getProgress() * 100 }}%
      (
      <size-text v-model="preference.currentTorrent!.completed"></size-text>
      /
      <size-text v-model="preference.currentTorrent!.total_size"></size-text>
      )
    </span></li>
    <li><span>速度:</span>
      <span>
        <el-icon>
          <Bottom/>
        </el-icon>
        <speed-text v-model="preference.currentTorrent!.dlspeed"></speed-text>
        <el-icon>
          <Top/>
        </el-icon>
           <speed-text v-model="preference.currentTorrent!.upspeed"></speed-text>
      </span>
    </li>
    <li><span>限速:</span>
      <span>
        <el-icon>
          <Download/>
        </el-icon>
         <speed-text v-model="preference.currentTorrent!.dl_limit"></speed-text>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <el-icon>
          <Upload/>
        </el-icon>
          <speed-text v-model="preference.currentTorrent!.up_limit"></speed-text>
       &nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </li>
    <li><span>分享率:</span><span>{{ preference.currentTorrent?.ratio }}</span></li>
    <li><span>种子数:</span><span>{{ preference.currentTorrent?.num_seeds }}</span></li>
    <li><span>吸血数:</span><span>{{ preference.currentTorrent?.num_leechs }}</span></li>

    <li><span>顺序下载:</span><span>{{ preference.currentTorrent?.seq_dl }}</span></li>
    <li><span>超级种子:</span><span>{{ preference.currentTorrent?.super_seeding }}</span></li>
    <li><span>优先级:</span><span>{{ preference.currentTorrent?.priority }}</span></li>

    <li><span>分类:</span><span>{{ preference.currentTorrent?.category }}</span></li>
    <li><span>标签:</span><span>{{ preference.currentTorrent?.tags }}</span></li>
  </ul>
</template>
<script lang="ts" setup>
import StoreDefinition from '@/stores';
import {Bottom, Download, Top, Upload} from '@element-plus/icons-vue';
import SizeText from "@/components/SizeText.vue";
import SpeedText from "@/components/SpeedText.vue";

const store = StoreDefinition()
const preference = store.globalPreference

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