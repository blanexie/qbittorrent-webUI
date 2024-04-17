<template>
    <el-tree style="max-width: 600px" :data="root" show-checkbox node-key="fullPath" :props="defaultProps">
        <template #default="{ node, data }">
            <p class="custom-tree-node">
                <el-text v-if="data.progress == 1" class="mx-1" type="success" truncated>
                    {{ node.label }}
                </el-text>
                <el-text v-if="data.progress < 1" type="info">
                    <span v-if="!data.isLeaf">
                        {{ node.label }}
                    </span>
                    <el-tooltip v-if="data.isLeaf" effect="light" :content="String(data.progress * 100) + '%'"
                        placement="top">
                        {{ node.label }}
                    </el-tooltip>
                </el-text>
            </p>
        </template>
    </el-tree>
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