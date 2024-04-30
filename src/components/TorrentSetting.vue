<template>

  <el-row>
    <el-col :span="6">名称:</el-col>
    <el-col :span="17">
      <el-input v-model="preference.currentTorrent!.setting.torrentName"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">保存路径:</el-col>
    <el-col :span="17">
      <el-input v-model="preference.currentTorrent!.setting.savePath"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">下载限速:</el-col>
    <el-col :span="17">
      <speed-input v-model="preference.currentTorrent!.setting.downloadLimit"></speed-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">上传限速:</el-col>
    <el-col :span="17">
      <speed-input v-model="preference.currentTorrent!.setting.uploadLimit"></speed-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">分类:</el-col>
    <el-col :span="17">
      <el-select v-model="preference.currentTorrent!.setting.category" :reserve-keyword="false" filterable allow-create
        placeholder="分类">
        <el-option v-for="item in preference.categories" :key="item" :label="item" :value="item" />
      </el-select>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">标签:</el-col>
    <el-col :span="17">
      <el-select v-model="preference.currentTorrent!.setting.tags" :reserve-keyword="false" multiple allow-create
        filterable placeholder="标签 ">
        <el-option v-for="(item, index) in preference.tags" :key="index" :label="item" :value="item" />
      </el-select>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">顺序下载:</el-col>
    <el-col :span="17">
      <el-switch v-model="preference.currentTorrent!.setting.sequential" />
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">超级种子:</el-col>
    <el-col :span="17">
      <el-switch v-model="preference.currentTorrent!.setting.superSeed" />
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="6">优先下载首尾:</el-col>
    <el-col :span="17">
      <el-switch v-model="preference.currentTorrent!.setting.f_l_piece_prio" />
    </el-col>
  </el-row>

  <div class="submit">
    <el-button @click="update" :loading="loading" type="primary">修改</el-button>
  </div>

</template>
<script lang="ts" setup>
import SpeedInput from "@/components/SpeedInput.vue";
import { axios } from "@/requests";
import StoreDefinition from "@/stores";
import { ElButton, ElCol, ElInput, ElMessage, ElNotification, ElOption, ElRow, ElSelect, ElSwitch } from 'element-plus';
import { ref } from "vue";
const store = StoreDefinition()
const preference = store.globalPreference

const loading = ref(false)

const sendRequest = (url: string, data: FormData) => {
  return axios.post(url, data)
    .then(resp => {
      console.log(resp);
      ElMessage.success("设置成功");
    })
    .catch(error => {
      console.error(`设置失败: ${error}`);
      ElMessage.error(`设置失败，${error}`);
    });
}

const update = async () => {
  const torrent = preference.currentTorrent
  if (torrent == null) {
    return
  }
  loading.value = true
  const setting = torrent.setting
  try {
    const updatePromises = [];
    //标签
    //1. 获取新增的标签
    const tTags = torrent.tags
    let addTags: string[] = []
    if (setting.tags != null) {
      addTags = setting.tags.filter(tag => !tTags.includes(tag)).filter(tag => tag != "")
    }

    //2. 判断需要新增的标签中那些是不存在的
    const newTags = addTags.filter(tag => !preference.tags.includes(tag)).filter(tag => tag != "")
    //3. 创建不存在的标签
    if (newTags.length > 0) {
      const from = new FormData();
      from.set("tags", newTags.join(","));
      await sendRequest('/api/v2/torrents/createTags', from)
    }
    //4. 给当前torrent增加标签
    if (addTags.length > 0) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("tags", addTags.join(","));
      const url = `/api/v2/torrents/addTags`;
      updatePromises.push(sendRequest(url, from));
    }
    //2. 获取要删的标签
    const delTags = tTags.filter(tag => !setting.tags.includes(tag))
    if (delTags.length > 0) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("tags", delTags.join(","));
      const url = `/api/v2/torrents/removeTags`;
      updatePromises.push(sendRequest(url, from));
    }

    //判断当前分类 如果不存在， 则新增
    console.log(preference.categories)
    if (setting.category != '' && !preference.categories.includes(setting.category)) {
      const from = new FormData();
      from.set("savePath", '');
      from.set("category", setting.category);
      const url = `/api/v2/torrents/createCategory`;
      await sendRequest(url, from)
    }
    //分类
    if (setting.category !== torrent.category) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("category", setting.category + "");
      const url = `/api/v2/torrents/setCategory`;
      updatePromises.push(sendRequest(url, from));
    }

    // 超级种子
    if (setting.superSeed !== torrent.super_seeding) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("value", setting.superSeed + "");
      const url = `/api/v2/torrents/setSuperSeeding`;
      updatePromises.push(sendRequest(url, from));
    }

    // 顺序下载
    if (setting.sequential !== torrent.seq_dl) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      const url = `/api/v2/torrents/toggleSequentialDownload`;
      updatePromises.push(sendRequest(url, from));
    }

    // 名称
    if (setting.torrentName !== torrent.name) {
      const from = new FormData();
      from.set("hash", torrent.hash);
      from.set("name", setting.torrentName);
      const url = '/api/v2/torrents/rename';
      updatePromises.push(sendRequest(url, from));
    }

    // 保存路径
    if (setting.savePath !== torrent.save_path) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("location", setting.savePath);
      const url = '/api/v2/torrents/setLocation';
      updatePromises.push(sendRequest(url, from));
    }

    // 下载限速
    if (setting.downloadLimit !== torrent.dl_limit) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("limit", setting.downloadLimit + "");
      const url = '/api/v2/torrents/setDownloadLimit';
      updatePromises.push(sendRequest(url, from));
    }

    // 上传限速
    if (setting.uploadLimit !== torrent.up_limit) {
      const from = new FormData();
      from.set("hashes", torrent.hash);
      from.set("limit", setting.uploadLimit + "");
      const url = '/api/v2/torrents/setUploadLimit';
      updatePromises.push(sendRequest(url, from));
    }

    // 使用async/await处理Promise.all
    await Promise.all(updatePromises);
    loading.value = false;
    ElMessage.success("所有设置已成功更新");
  } catch (error) {
    loading.value = false;
    ElNotification({
      title: 'Error',
      message: "修改有失败" + error,
      type: 'error',
    });
  }

}

</script>
<style scoped>
.submit {
  text-align: center;
}

.el-row {
  margin-top: 10px;

  .el-col:first-child {
    text-align: right;
    padding-right: 10px;
  }
}
</style>