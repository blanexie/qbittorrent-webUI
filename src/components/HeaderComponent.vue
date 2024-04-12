<template>
  <div class="toolbar">
    <el-tooltip content="退出登录" effect="light">
      <el-icon>
        <SwitchButton />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全局设置" effect="light">
      <el-icon>
        <Setting />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="新增下载" effect="light">
      <el-icon>
        <Plus />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全部开始" effect="light">
      <el-icon>
        <VideoPlay />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="全部暂停" effect="light">
      <el-icon>
        <VideoPause />
      </el-icon>
    </el-tooltip>
    <el-tooltip content="刷新" effect="light">
      <el-icon>
        <Refresh />
      </el-icon>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
import { Plus, Refresh, Setting, SwitchButton, VideoPause, VideoPlay } from '@element-plus/icons-vue';
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
  cursor: pointer;
}

.el-icon:hover {
  color: var(--border-color);
}
</style>
