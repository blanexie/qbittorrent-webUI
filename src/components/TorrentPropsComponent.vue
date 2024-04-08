<template>
  <ul>
    <li><span>InfoHash:</span><span>{{ torrentInfo?.hash }}</span></li>
    <li><span>Size:</span><span>{{ torrentInfo?.size.getSizeStr() }}</span></li>
    <li><span>Downloaded:</span><span>{{ torrentInfo?.downloaded.getSizeStr() }}</span></li>
    <li><span>progress:</span><span>{{ torrentInfo?.getProgress() }}%</span></li>

    <li><span>DlSpeed:</span><span>{{ torrentInfo?.dlspeed.getSpeedStr() }}</span></li>
    <li><span>UpSpeed:</span><span>{{ torrentInfo?.upspeed.getSpeedStr() }}</span></li>

    <li><span>Category:</span><span>{{ torrentInfo?.category }}</span></li>
    <li><span>Tags:</span><span>{{ torrentInfo?.tags }}</span></li>
    <li><span>seeds:</span><span>{{ torrentInfo?.num_seeds }}</span></li>
    <li><span>leechs:</span><span>{{ torrentInfo?.num_leechs }}</span></li>

    <li><span>seq_dl:</span><span>{{ torrentInfo?.seq_dl }}</span></li>

    <li><span>ratio:</span><span>{{ torrentInfo?.ratio }}</span></li>
    <li><span>state:</span><span>{{ torrentInfo?.state }}</span></li>
    <li><span>super_seeding:</span><span>{{ torrentInfo?.super_seeding }}</span></li>
    <li><span>priority:</span><span>{{ torrentInfo?.priority }}</span></li>
  </ul>
</template>
<script lang="ts" setup>
import { TorrentInfo } from '@/util'

const torrentInfo = defineModel<TorrentInfo>()

</script>
<style scoped>
ul {
  padding: 0;
  list-style-type: none;
}

li {
  height: 30px;

  span:first-child {
    display: inline-block;
    margin-right: 10px;
    width: 100px;
    text-align: right;
  }

}

</style>