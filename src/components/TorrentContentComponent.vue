<template>
  <el-tree :data="globalInfo.files" node-key="name" :props="defaultProps">
    <template #default="{ node, data }">
      <p class="custom-tree-node">
        <!--  叶子节点，同时下载完成-->
        <el-text v-if="data.isLeaf && data.progress == 1 " type="success">
          <el-tooltip effect="light" :content="getTopTip(data)" placement="top-start">
            {{ node.label }}
          </el-tooltip>
        </el-text>
        <!-- 叶子节点，但是没有下载完成-->
        <el-text v-if=" data.isLeaf && data.progress < 1 " type="info">
          <el-tooltip effect="light" :content="getTopTip(data)" placement="top-start">
            {{ node.label }}
          </el-tooltip>
        </el-text>
        <!-- 中间目录节点-->
        <el-text v-if="!data.isLeaf" type="info">
          {{ node.label }}
        </el-text>

      </p>
    </template>
  </el-tree>
</template>
<script lang="ts" setup>
import StoreDefinition from '@/stores';
import {ElText, ElTree} from 'element-plus';
import {ByteData} from "@/util";

const store = StoreDefinition()
const globalInfo = store.globalInfo

const defaultProps = {
  children: 'children',
  label: 'label',
}
const getTopTip = (data: any) => {
  return String(Math.floor(data.progress * 100) + '% ( ' + new ByteData(data.size).getSizeStr() + ' )')
}
</script>
<style scoped></style>