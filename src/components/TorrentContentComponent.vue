<template>
    <el-tree style="max-width: 600px" :data="root" show-checkbox node-key="name" :props="defaultProps"></el-tree>
</template>
<script lang="ts" setup>
import type { TorrentFile } from '@/util';
const root = defineModel<TorrentFile[]>()
const defaultProps = {
    children: 'children',
    label: 'name',
}

</script>
<style scoped></style>