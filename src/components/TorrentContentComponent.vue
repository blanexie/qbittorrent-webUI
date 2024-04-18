<template>
    <el-tree style="max-width: 600px" :data="globalInfo.files" show-checkbox node-key="name" :props="defaultProps">
        <template #default="{ node, data }">
            <p class="custom-tree-node">
                <el-text v-if="data.progress == 1" class="mx-1" type="success" truncated>
                    {{ node.label }}
                </el-text>
                <el-text v-if="data.progress < 1" type="info">
                    <span v-if="!data.isLeaf">
                        {{ node.label }}
                    </span>
                    <el-tooltip v-if="data.isLeaf" effect="light"
                        :content="String(Math.floor(data.progress * 100) + '%') + String(' ( ' + new ByteData(data.size).getSizeStr() + ' ) ')"
                        placement="top">
                        {{ node.label }}
                    </el-tooltip>
                </el-text>
            </p>
        </template>
    </el-tree>
</template>
<script lang="ts" setup>
import StoreDefinition from '@/stores';
import { ByteData } from '@/util';
import { ElText, ElTooltip, ElTree } from 'element-plus';
const store = StoreDefinition()
const globalInfo = store.globalInfo

const defaultProps = {
    children: 'children',
    label: 'label',
}

</script>
<style scoped></style>