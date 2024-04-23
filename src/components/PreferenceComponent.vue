<template>
    <el-dialog v-model="globalPreference.show" @open="openInit" title="设置">
        <el-tabs class="demo-tabs">
            <el-tab-pane label="User" name="first">User</el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="globalPreference.show = false">取消</el-button>
                <el-button type="primary" @click="update">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { axios } from '@/requests';
import StoreDefinition from '@/store';
import { Preference, mergeObj } from '@/util';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
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