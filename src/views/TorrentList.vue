<template>
  <ul>
    <li v-for="t in tableData" v-bind:key="t.name">
      <p class="p1">
        <span class="li-left">  {{ t.name }}</span>
        <span class="li-right">
          <el-icon><Close/></el-icon>
          <el-icon><VideoPlay/></el-icon>
          <el-icon><VideoPause/></el-icon>
        </span>
      </p>
      <p class="p2">
        <el-progress :percentage="90"></el-progress>
      </p>
      <p class="p3">
        <span class="li-left">90M/2.1GB </span>
        <span class="li-right">
          <el-icon><Bottom/></el-icon>10KB/s
          <el-icon><Top/></el-icon>20KB/s
          <el-icon><Timer/></el-icon>2h 11min
          <el-icon><Magnet/></el-icon>91
          <el-icon><Link/></el-icon>157
        </span>
      </p>
    </li>
  </ul>
  <TorrentDetail/>
</template>
<script setup lang="ts">
import {Bottom, Close, Magnet, Timer, Top, VideoPause, VideoPlay} from "@element-plus/icons-vue";
import TorrentDetail from "@/views/TorrentDetail.vue";

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom2',
    address: 'No. 187, Grove St, Los Angeles',
  }]
</script>
<style scoped>
ul {
  list-style-type: none;
  padding-inline-start: 0;
  min-width: 500px;


  li {
    margin: 5px 0;
    border: 1px solid #909399;
    border-radius: 10px;
    padding: 10px;

    p {
      height: auto;
      width: 100%;
      overflow: auto; /* 清除浮动 */

      .el-icon {
        vertical-align: middle;
        font-size: 16px;
        margin-left: 5px;
      }
    }

    .p1 {
      padding-right: 25px;

      .el-icon {
        margin: 0 5px;
      }
    }

    .p2 {
      height: 20px;
    }

    .p3 {
      padding-right: 25px;
    }

    .li-left {
      float: left;
    }

    .li-right {
      float: right;
    }

  }
}


</style>