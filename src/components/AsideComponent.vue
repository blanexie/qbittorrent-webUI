<template>
    <el-scrollbar>
      <el-menu :default-openeds="['1', '3']">
        <el-sub-menu index="1">
          <template #title>
            Torrent Status
          </template>
        </el-sub-menu>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <template #title>
              <el-icon>
                <Menu/>
              </el-icon>
              All
            </template>

          </el-menu-item>
          <el-menu-item index="1-2">
            <template #title>
              <el-icon>
                <Download/>
              </el-icon>
              Downloading
            </template>
          </el-menu-item>
          <el-menu-item index="1-3">
            <template #title>
              <el-icon>
                <Finished/>
              </el-icon>
              Complete
            </template>
          </el-menu-item>
          <el-menu-item index="1-4">
            <template #title>
              <el-icon>
                <VideoPause/>
              </el-icon>
              Stop
            </template>
          </el-menu-item>
          <el-menu-item index="1-5">
            <template #title>
              <el-icon>
                <Connection/>
              </el-icon>
              Active
            </template>
          </el-menu-item>
          <el-menu-item index="1-6">
            <template #title>
              <el-icon>
                <Warning/>
              </el-icon>
              Inactive
            </template>
          </el-menu-item>
          <el-menu-item index="1-7">
            <template #title>
              <el-icon>
                <CircleClose/>
              </el-icon>
              Error
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-scrollbar>
</template>
<script setup lang="ts">
import {CircleClose, Connection, Download, Finished, VideoPause, Warning} from "@element-plus/icons-vue";
</script>
<style scoped>
.el-menu{
  height: 100vh;
}
</style>