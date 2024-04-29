<template>
  <span class="size-text">{{ getUnitStr() }}</span>
</template>
<script lang="ts" setup>
import {findUnit} from '@/util'

const bytes = defineModel<number>()
const getUnitStr = () => {
  const unit = findUnit(bytes.value!)
  return unit.value + unit.name
}


</script>
<style scoped>

</style>