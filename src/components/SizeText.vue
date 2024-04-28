<template>
  <span>{{ show.value }}{{ show.name }}</span>
</template>
<script lang="ts" setup>
import {findUnit} from '@/util'
import {reactive} from "vue";

const bytes = defineModel<number>()

const show = reactive({
  value: 0,
  name: 'B',
  size: 1024,
})
const unit = findUnit(bytes.value!)
show.value = unit.value
show.name = unit.name
show.size = unit.size

</script>