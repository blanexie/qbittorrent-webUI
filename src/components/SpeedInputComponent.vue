<template>
  <el-input v-model="su.speed" placeholder="Please input" @change="change" size="small">
    <template #append>
      <el-select v-model="su.unit" @change="change" style="width: 80px" size="small">
        <el-option v-for="u in su.units" v-bind:key="u.value" :label="u.label" :value="u.value" />
      </el-select>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { ElInput, ElOption, ElSelect } from "element-plus";
import { reactive } from "vue";

const speed = defineModel<number>("speed")
const su = reactive({
  units: [
    {
      label: "B/s",
      value: 1
    },
    {
      label: "KB/s",
      value: 1024
    },
    {
      label: "MB/s",
      value: 1048576
    },
    {
      label: "GB/s",
      value: 1073741824
    }
  ],
  unit: 1024,
  speed: 0,
})

su.speed = Math.floor((speed.value!!) / su.unit)


const change = () => {
  return speed.value = su.speed * su.unit
}

</script>