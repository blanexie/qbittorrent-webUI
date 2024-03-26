<template>
  <el-container class="layout-container-demo" >
    <el-aside width="200px">
      <AsideComponent></AsideComponent>
    </el-aside>
    <el-container>
      <el-header style="text-align: left;">
        <HeaderComponent></HeaderComponent>
      </el-header>
      <el-main>
        <el-scrollbar>
<!--         <RouterView></RouterView>-->
          <TorrentList/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AsideComponent from "@/components/AsideComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import TorrentList from "@/views/TorrentList.vue";

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #efefef;
  color: var(--el-text-color-primary);
}
</style>
