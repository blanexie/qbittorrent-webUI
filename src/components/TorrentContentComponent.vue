<template>
    <div></div>
</template>
<script lang="ts" setup>
import { axios } from '@/requests';
import { TorrentFile } from '@/util';
import { reactive } from 'vue';
const hash = defineModel<string>("hash")

const data = reactive({
    files: Array<TorrentFile>()
})

const url = '/api/v2/torrents/files?hash=' + hash.value + '&' + new Date().getTime()
axios.get(url).then(resp => {

})

</script>
<style scoped></style>