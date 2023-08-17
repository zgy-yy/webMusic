<script setup lang="ts">

import {nextTick, onUpdated, ref, toRefs} from "vue";
import BScroll from "@better-scroll/core";
import type {BScrollInstance} from "@better-scroll/core/dist/types/Instance";

const props = defineProps<{
  scrollTo?: number
}>()
const {scrollTo} = toRefs(props)
const scrollRef = ref<HTMLElement | null>(null)

const bs = ref<BScrollInstance | null>(null)

nextTick(() => {
  if (scrollRef.value) {
    bs.value = new BScroll(scrollRef.value, {
      specifiedIndexAsContent: 1,
      observeDOM: true,
      probeType: 3,
      click: true
    })
  }
})
onUpdated(() => { //dom 更新后刷新
  if (bs.value) {
    if (scrollTo?.value) {
      bs.value.scrollTo(0, scrollTo.value, 300, undefined)
    }
    bs.value.refresh()
  }
})
</script>

<template>
  <div class="wrapper" ref="scrollRef">
    <div>
      <slot name="top"></slot>
    </div>
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  height: 100%;
  overflow: hidden;

  .scroll-content {
    width: 100%;
  }
}

</style>