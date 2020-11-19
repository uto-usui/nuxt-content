<template>
  <section class="wrap">
    <h1 class="title">laboobal.dev</h1>
    <div class="inner"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx) {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
}

.inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>
