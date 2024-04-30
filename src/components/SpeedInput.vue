<template>
  <el-input v-model="show.value" @change="changeValue" placeholder="Please input" size="small">
    <template #append>
      <el-select v-model="show.size" @change="changeValue" style="width: 80px" size="small">
        <el-option v-for="u in units" v-bind:key="u.name" :label="u.name + '/s'" :value="u.size" />
      </el-select>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { findUnit, units } from "@/util";
import { ElInput, ElOption, ElSelect } from "element-plus";
import { reactive } from "vue";

const speed = defineModel<number>()

let unit = {
  size: 1024,
  value:0
}
if (speed.value == null) {
  speed.value = 0
} else {
  unit = findUnit(speed.value)
}

const show = reactive({
  value: unit.value,
  size: unit.size
})
const changeValue = () => {
  speed.value = show.size * show.value
}

</script>