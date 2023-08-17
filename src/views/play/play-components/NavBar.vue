<script setup lang="ts">
import {toRefs} from "vue";

import type {Song} from "@/type/music";

const props = defineProps<{ song: Song }>()
const {song} = toRefs(props)

const emits = defineEmits<{
  (name: 'close'): void
}>()

function close() {
  emits('close')
}

</script>

<template>
  <div class="title">
    <p class="song-name-bar">
      <img @click="close" class="icon" src="/src/assets/icon/back.svg" alt=""/>
      <span>{{ song?.name }}</span>
      <img class="icon" src="/src/assets/icon/share.svg" alt=""/>
    </p>
    <p class="singer">
      <span v-for="(art,index) in (song?.artists||song?.ar)" :key="art.name">
          {{ art.name }}<span v-if="index!==(song?.artists||song?.ar)?.length-1"> / </span>
        </span>
    </p>
  </div>
</template>

<style scoped lang="less">
.title {
  text-align: center;
  height: 44px;
  font-weight: 1000;
  color: rgba(150, 144, 144, 0.95);

  .song-name-bar {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      padding: 0 16px;
    }

    span {
      line-height: 300%;
      height: 100%;
    }
  }

  .singer {
    transform: translateY(-50%);
    font-size: 0.8rem;
  }
}
</style>