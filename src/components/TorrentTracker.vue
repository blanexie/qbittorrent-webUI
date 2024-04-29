<template>
  <el-table :data="preference.currentTorrent!.trackers">
    <el-table-column prop="url" label="Url"/>
    <el-table-column prop="statusText" label="status"/>
    <el-table-column prop="num_peers" label="peers"/>
    <el-table-column prop="num_leeches" label="吸血"/>
    <el-table-column prop="num_seeds" label="做种"/>
  </el-table>
</template>
<script lang="ts" setup>
import {ElTable, ElTableColumn} from 'element-plus';
import StoreDefinition from "@/stores";

const store = StoreDefinition();
const preference = store.globalPreference;

</script>
<style scoped></style>