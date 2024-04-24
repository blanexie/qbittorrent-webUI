<template>
  <el-dialog class="pre" v-model="globalPreference.show" @open="openInit" title="设置">
    <el-row>
      <el-col :span="6">下载协议:</el-col>
      <el-col :span="17">
        <el-select v-model="preference.temp.bittorrent_protocol" size="small">
          <el-option :key="0" label="TCP and μTP" :value="0"></el-option>
          <el-option :key="1" label="TCP" :value="1"></el-option>
          <el-option :key="2" label="μTP" :value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">监听端口:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.listen_port" type="number" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">开启UPnP/NAT-PMP:</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.upnp" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">保存路径:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.save_path" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">总连接:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_connec" type="number" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">每Torrent连接数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_connec_per_torrent" type="number" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">总上传窗口数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_uploads" type="number" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">每Torrent上传连接数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_uploads_per_torrent" type="number" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">全局上传速度限制:</el-col>
      <el-col :span="17">
        <SpeedInputComponent v-model:speed="preference.temp.up_limit"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">全局下载速度限制:</el-col>
      <el-col :span="17">
        <SpeedInputComponent v-model:speed="preference.temp.dl_limit"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">慢速torrent是否限速:</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.dont_count_slow_torrents" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">慢速下载阈值:</el-col>
      <el-col :span="17">
        <SpeedInputComponent v-model:speed="preference.temp.slow_torrent_dl_rate_threshold"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">慢速上传阈值:</el-col>
      <el-col :span="17">
        <SpeedInputComponent v-model:speed="preference.temp.slow_torrent_ul_rate_threshold"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">慢速Torrent（秒）:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.slow_torrent_inactive_timer" size="small" type="number"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">启用DHT:</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.dht" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">启用用户交换(PeX):</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.pex" size="small"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">启用本地用户发现:</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.lsd" size="small"/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">加密模式:</el-col>
      <el-col :span="17">
        <el-select v-model="preference.temp.encryption" size="small">
          <el-option label="优先加密" :value="0"></el-option>
          <el-option label="强制加密" :value="1"></el-option>
          <el-option label="关闭加密" :value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">启用匿名模式:</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.anonymous_mode" size="small"></el-switch>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">最大活动的下载Torrent数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_active_downloads" type="number" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">最大活动的上传Torrent数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_active_uploads" type="number" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">最大活动的Torrent数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.max_active_torrents" type="number" size="small"></el-input>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="6">WEBUI端口:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.web_ui_port" type="number" size="small"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">WEBUI是否启用UPnP:</el-col>
      <el-col :span="17">
        <el-switch v-model="preference.temp.web_ui_upnp" type="number" size="small"></el-switch>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">用户名:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.web_ui_username" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">密码:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.web_ui_password" size="small"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">最大登录失败次数:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.web_ui_max_auth_fail_count" type="number" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">登录失败后封禁时间（秒）:</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.web_ui_ban_duration" type="number" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">会话超时(秒):</el-col>
      <el-col :span="17">
        <el-input v-model="preference.temp.web_ui_session_timeout" type="number" size="small"></el-input>
      </el-col>
    </el-row>
    <div class="sub-but">
      <el-button type="primary">提交</el-button>
      <el-button type="primary">取消</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {axios} from '@/requests';
import StoreDefinition from "@/stores";
import {ElCol, ElInput, ElMessage, ElOption, ElRow, ElSelect} from 'element-plus';
import {mergeObj, Preference} from "@/util";
import SpeedInputComponent from "@/components/SpeedInputComponent.vue";

const store = StoreDefinition()
const globalPreference = store.globalPreference

const preference = reactive<{
  temp: Preference,
}>({
  temp: new Preference()
})

const openInit = () => {
  console.log("openInit")
  //复制一份globalPreference数据
  preference.temp = JSON.parse(JSON.stringify(globalPreference))
}

const update = () => {
  console.log("update")
  // 比较 preference.temp 与 globalPreference 的差异， 获取那些字段修改了
  const req = findChangedField(preference.temp, globalPreference)
  axios.post('/api/v2/app/setPreferences', req).then(res => {
    ElMessage.success('设置成功')
    globalPreference.show = false
    mergeObj(globalPreference, preference.temp)
  }).catch(err => {
    ElMessage.error('设置失败' + err)
  })
}


function findChangedField(base: any, src: any) {
  if (src) { /* empty */
  } else {
    return base
  }
  const ret = new Map<string, any>()
  const keysb = Object.keys(base)
  const keyss = Object.keys(src)
  for (const k of keyss) {
    const index = keysb.indexOf(k)
    if (index >= 0 && base[k] != src[k]) {
      ret.set(k, base[k])
    }
  }
  return ret
}


</script>
<style scoped>
.sub-but {
  padding: 10px 0;
  text-align: center;
}

.el-row {
  padding: 5px 0;

  .el-col:first-child {
    text-align: right;
    min-width: 200px;
    margin-right: 10px;
  }

  .el-col-17 {
    width: 1000px;
  }

}

</style>