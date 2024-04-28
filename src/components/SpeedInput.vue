<template>
  <el-input v-model="su.speed" placeholder="Please input" @change="change" size="small">
    <template #append>
      <el-select v-model="su.unit" @change="change" style="width: 80px" size="small">
        <el-option v-for="u in units" v-bind:key="u.name" :label="u.name" :value="u.size"/>
      </el-select>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import {ElInput, ElOption, ElSelect} from "element-plus";
import {reactive} from "vue";
import {units} from "@/util";

const speed = defineModel<number>("speed")

const su = reactive({
  unit: 1024,
  speed: 0,
})

if (speed.value == null) {
  speed.value = 0
}

su.speed = Math.floor((speed.value!!) / su.unit)
const change = () => {
  return speed.value = su.speed * su.unit
}

</script>