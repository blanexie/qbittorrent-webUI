<template>
  <el-dialog v-model="store.globalInfo.showTorrentAddView" @open="openInit" width="600">
    <el-tabs v-model="data.activeTab">
      <el-tab-pane label="磁链任务" name="first">
        <el-row class="url-input">
          <el-col :span="24">
            <el-input v-model="data.links" :rows="5" type="textarea" placeholder="每行一个磁链" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="种子任务" name="second">
        <el-row>
          <el-col :span="24">

            <el-upload drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
              <el-icon class="filled-icon">
                <upload-filled />
              </el-icon>
              <div>
                拖拽Torrent文件至此或 <el-text type="primary">点击上传 </el-text>
              </div>
              <template #tip>
                <div>
                  Torrent文件大小不得超过10MB
                </div>
              </template>
            </el-upload>



          </el-col>
        </el-row>

      </el-tab-pane>
      <el-row>
        <el-col :span="5">分类:</el-col>
        <el-col :span="17">
          <el-select v-model="data.category" size="small" placeholder="请选择分类">
            <el-option v-for="item in store.globalInfo.categories" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">重命名Torrent:</el-col>
        <el-col :span="17">
          <el-input v-model="data.rename" size="small"></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">跳过hash校验:</el-col>
        <el-col :span="17">
          <el-switch v-model="data.skip_checking"></el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">下载限速:</el-col>
        <el-col :span="17">
          <SpeedInputComponent v-model:speed="data.dlLimit"></SpeedInputComponent>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">上传限速:</el-col>
        <el-col :span="17">
          <SpeedInputComponent v-model:speed="data.upLimit"></SpeedInputComponent>
        </el-col>
      </el-row>
      <div class="but">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="primary">取消</el-button>
      </div>
    </el-tabs>
  </el-dialog>
</template>
<script setup lang="ts">
import SpeedInputComponent from "@/components/SpeedInputComponent.vue";
import { axios } from "@/requests";
import StoreDefinition from "@/stores";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElButton, ElCol, ElDialog, ElIcon, ElInput, ElMessage, ElOption, ElRow, ElSelect, ElSwitch, ElTabPane, ElTabs, ElUpload } from "element-plus";
import { reactive } from "vue";

const store = StoreDefinition()

const data = reactive({
  links: '',
  torrentFiles: null,
  autoTMM: true,
  skip_checking: false,
  cookie: '',
  rename: '',
  category: '',
  paused: false,
  contentLayout: 'Original',
  upLimit: 0,
  dlLimit: 0,
  activeTab: 'first',
})

const submit = () => {
  if (data.activeTab == 'first') {
    console.log("addLinks")
    const fromValue = new FormData()
    fromValue.set("urls", data.links)
    fromValue.set("cookie", data.cookie)
    fromValue.set("skip_checking", String(data.skip_checking))
    fromValue.set("category", data.category)
    fromValue.set("rename", data.rename)
    fromValue.set("upLimit", String(data.upLimit))
    fromValue.set("dlLimit", String(data.dlLimit))
    fromValue.set("autoTMM", String(data.autoTMM))
    fromValue.set("paused", 'false')
    fromValue.set("contentLayout", data.contentLayout)

    axios({
      url: '/api/v2/torrents/add',
      method: "POST",
      data: fromValue,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      console.log(resp.data)
      if (resp.data == 'Ok.') {
        store.globalInfo.rid = 0
        ElMessage.success("添加成功")
        store.globalInfo.showTorrentAddView = false
      } else {
        ElMessage.error("添加失败")
      }
    }).catch(error => {
      ElMessage.error("添加失败" + error)
    })

  } else { /* empty */ }
}


const openInit = async () => {
  await fetchTagsAndCategory()
}

const fetchTagsAndCategory = async () => {
  axios.get('/api/v2/torrents/categories').then(resp => {
    store.globalInfo.categories.length = 0
    const keys = Object.keys(resp.data)
    keys.forEach(it => {
      store.globalInfo.categories.push(it)
    })
  }).catch(error => {
    ElMessage.error("获取分类失败" + error)
  })
}

</script>
<style scoped>
.filled-icon {
  font-size: 35px;
}

.url-input {
  padding: 10px;
}


.but {
  padding-top: 15px;
  text-align: center;
}

.el-row {
  margin-bottom: 10px;

  .el-col:first-child {
    text-align: right;
    margin-right: 10px;
  }
}
</style>