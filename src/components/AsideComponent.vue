<template>
  <div class="side">
    <div class="header"><FlyIcon></FlyIcon> Qbittorrent </div>
    <el-menu>
      <el-menu-item index="2">
        <template #title>
          <el-icon>
            <Download />
          </el-icon>
          下载中
        </template>
      </el-menu-item>
      <el-menu-item index="3">
        <template #title>
          <el-icon>
            <Finished />
          </el-icon>
          已完成
        </template>
      </el-menu-item>
      <el-menu-item index="4">
        <template #title>
          <el-icon>
            <VideoPause />
          </el-icon>
          已暂停
        </template>
      </el-menu-item>

      <el-menu-item index="7">
        <template #title>
          <el-icon>
            <Warning />
          </el-icon>
          出错
        </template>
      </el-menu-item>
    </el-menu>
    <SpeedInfoComponent />
  </div>
</template>
<script setup lang="ts">
import { Download, Finished, VideoPause, Warning } from '@element-plus/icons-vue'
import SpeedInfoComponent from '@/components/SpeedInfoComponent.vue'
import FlyIcon from '@/components/icons/FlyIcon.vue'

</script>
<style scoped>
.side {
  border-right: 1px #efefef solid;
  height: 95vh;

  .el-menu {
    border-right-color: white;
  }

  .header {
    height: 50px;
  }
}
</style>