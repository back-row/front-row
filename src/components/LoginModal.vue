<script setup lang='ts'>
const props = defineProps({ visible: { type: Boolean, required: true } });

</script>

<template>
  <div
    class='absolute right-0 top-9 ease-in-out duration-200 rounded-md flex items-center justify-center bg-blackBackrow text-greenBackrow h-32 w-96'
    :class='{"opacity-0":!props.visible}'>
    HEJ
  </div>
</template>

<style scoped>

</style>
