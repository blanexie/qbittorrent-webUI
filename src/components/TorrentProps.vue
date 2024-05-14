<template>

  <el-row>
    <el-col :span="5">InfoHash :</el-col>
    <el-col :span="18">{{ preference.currentTorrent?.hash }}</el-col>
  </el-row>

  <el-row>
    <el-col :span="5">添加时间 :</el-col>
    <el-col :span="18">{{ preference.currentTorrent?.getAddOnStr() }}</el-col>
  </el-row>
  <el-row>
    <el-col :span="5">剩余时间 :</el-col>
    <el-col :span="18">{{ preference.currentTorrent?.getEtaStr() }}</el-col>
  </el-row>
  <el-row>
    <el-col :span="5">存储路径 :</el-col>
    <el-col :span="18">{{ preference.currentTorrent?.content_path }}</el-col>
  </el-row>
  <el-row>
    <el-col :span="5">状态 :</el-col>
    <el-col :span="18">{{ preference.currentTorrent?.state }}</el-col>
  </el-row>
  <el-row>
    <el-col :span="5">进度 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent!.getProgress() * 100 }} % (
      <size-text v-model="preference.currentTorrent!.completed"></size-text>
      /
      <size-text v-model="preference.currentTorrent!.total_size"></size-text>
      )
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">速度 :</el-col>
    <el-col :span="18">
      <el-icon>
        <Bottom />
      </el-icon>
      <speed-text v-model="preference.currentTorrent!.dlspeed"></speed-text>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-icon>
        <Top />
      </el-icon>
      <speed-text v-model="preference.currentTorrent!.upspeed"></speed-text>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">限速 :</el-col>
    <el-col :span="18">
      <el-icon>
        <Download />
      </el-icon>
      <speed-text v-model="preference.currentTorrent!.dl_limit"></speed-text>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-icon>
        <Upload />
      </el-icon>
      <speed-text v-model="preference.currentTorrent!.up_limit"></speed-text>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="5">分享率 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.ratio.toFixed(2) }}
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">种子数 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.num_seeds }}
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">吸血数 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.num_leechs }}
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="5">顺序下载 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.seq_dl }}
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="5">超级种子 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.super_seeding }}
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="5">优先级 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.priority }}
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">分类 :</el-col>
    <el-col :span="18">
      {{ preference.currentTorrent?.category }}
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">标签 :</el-col>
    <el-col :span="18">
      <el-tag v-for="tag in preference.currentTorrent?.tags" :key="tag" size="small" type="primary">{{ tag }}</el-tag>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import SizeText from "@/components/SizeText.vue";
import SpeedText from "@/components/SpeedText.vue";
import StoreDefinition from '@/stores';
import { Bottom, Download, Top, Upload } from '@element-plus/icons-vue';

const store = StoreDefinition()
const preference = store.globalPreference

</script>
<style scoped>
.el-row {
  margin-top: 5px;

  .el-col:first-child {
    text-align: right;
    padding-right: 10px;
  }
}
</style>