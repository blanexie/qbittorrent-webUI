<template>
    <el-table :data="globalInfo.trackers">
    <el-table-column prop="url" label="Url" width="180" />
    <el-table-column prop="msg" label="Msg" width="180" />
    <el-table-column prop="num_peers" label="num_peers" width="180" />
    <el-table-column prop="status" label="status" />
  </el-table>
</template>
<script lang="ts" setup>
import { ElTable, ElTableColumn  } from 'element-plus';
import StoreDefinition from "@/stores";
const store = StoreDefinition();
const globalInfo = store.globalInfo;

</script>
<style scoped>
</style>