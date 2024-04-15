<template>
  <div class="side">
    <div class="header">
      <FlyIcon class="fly"></FlyIcon>
      <div class="qbt"> Qbittorrent</div>
    </div>
    <el-menu @select="menuSelect" :default-active="store.globalInfo.currentMenu">
      <el-menu-item index="downloading">
        <template #title>
          <el-icon>
            <Download />
          </el-icon>
          下载中
        </template>
      </el-menu-item>
      <el-menu-item index="finish">
        <template #title>
          <el-icon>
            <Finished />
          </el-icon>
          已完成
        </template>
      </el-menu-item>
      <el-menu-item index="quene">
        <template #title>
          <el-icon>
            <VideoPause />
          </el-icon>
          队列中
        </template>
      </el-menu-item>

      <el-menu-item index="error">
        <template #title>
          <el-icon>
            <Warning />
          </el-icon>
          暂停
        </template>
      </el-menu-item>
    </el-menu>
    <br />
    <SpeedInfoComponent />
  </div>
</template>
<script setup lang="ts">
import SpeedInfoComponent from '@/components/SpeedInfoComponent.vue';
import FlyIcon from '@/components/icons/FlyIcon.vue';
import StoreDefinition from '@/stores';
import { Download, Finished, VideoPause, Warning } from '@element-plus/icons-vue';

const store = StoreDefinition()
const menuSelect = (index: string) => {
  store.globalInfo.currentMenu = index
}
</script>
<style scoped>
.side {
  border-right: 1px #efefef solid;
  height: 95vh;

  .header {
    padding: 10px;

    .fly {
      height: 30px;
      width: 30px;
    }

    .qbt {
      display: inline-block;
      height: 30px;
      padding-bottom: 30px;
    }
  }

  .el-menu {
    border-right-color: white;
  }

}
</style>