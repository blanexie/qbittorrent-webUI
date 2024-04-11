<template>
  <div class="toolbar">
    <el-icon>
      <Setting />
    </el-icon>
    <el-icon>
      <Plus />
    </el-icon>

    <el-icon>
      <VideoPlay />
    </el-icon>
    <el-icon>
      <VideoPause />
    </el-icon>
    <el-icon>
      <Refresh />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { Minus, Plus, Refresh, Setting, VideoPause, VideoPlay } from "@element-plus/icons-vue";
</script>

<style scoped>
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: large;
}

.el-icon {
  margin-right: 20px;
}
</style>
