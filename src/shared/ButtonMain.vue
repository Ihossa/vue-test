<script setup>
import { defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  disable: {
    type: Boolean
  }
})

const emits = defineEmits(['onClick'])
</script>

<template>
  <el-button
    :disabled="props.disable"
    @click="
      () => {
        emits('onClick')
      }
    "
    class="btn-apply"
    type="success"
    round
    >{{ props.label }}</el-button
  >
</template>

<style scoped>
.btn-apply {
  display: block;
  width: min-content;
  margin: auto;
}
</style>
