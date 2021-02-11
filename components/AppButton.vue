<template>
  <div>
    <button><slot name="primeiro" /></button>
    <button><slot name="segundo" /></button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
