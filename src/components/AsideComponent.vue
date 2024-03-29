<template>
  <el-menu >
    <el-menu-item index="1">
      <template #title>
        <el-icon>
          <Menu/>
        </el-icon>
        All
      </template>
    </el-menu-item>
    <el-menu-item index="2">
      <template #title>
        <el-icon>
          <Download/>
        </el-icon>
        Downloading
      </template>
    </el-menu-item>
    <el-menu-item index="3">
      <template #title>
        <el-icon>
          <Finished/>
        </el-icon>
        Complete
      </template>
    </el-menu-item>
    <el-menu-item index="4">
      <template #title>
        <el-icon>
          <VideoPause/>
        </el-icon>
        Stop
      </template>
    </el-menu-item>
    <el-menu-item index="5">
      <template #title>
        <el-icon>
          <Connection/>
        </el-icon>
        Active
      </template>
    </el-menu-item>
    <el-menu-item index="6">
      <template #title>
        <el-icon>
          <Warning/>
        </el-icon>
        Inactive
      </template>
    </el-menu-item>
    <el-menu-item index="7">
      <template #title>
        <el-icon>
          <CircleClose/>
        </el-icon>
        Error
      </template>
    </el-menu-item>
  </el-menu>
  <SpeedInfoComponent/>

</template>
<script setup lang="ts">
import {CircleClose, Connection, Download, Finished, VideoPause, Warning} from "@element-plus/icons-vue";
import SpeedInfoComponent from "@/components/SpeedInfoComponent.vue";
</script>
<style scoped>

</style>