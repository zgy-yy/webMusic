<script setup lang="ts">
import {computed, nextTick, onMounted, reactive, ref} from 'vue'
import {getSinger, getSingerDetail} from '@/server/api/singer'
import type {Singer} from '@/type/singer'
import VirtualList from "@/components/VirtualList.vue";
import type {Song} from "@/type/music";
import SongItem from "@/components/SongItem.vue";
import VScroll from "@/components/VScroll.vue";
import BScroll from "@better-scroll/core";

const singers = ref<Singer[]>([])


// getSinger(1002).then((res) => {
//   singers.value = res
// })
const songs = ref([])
getSingerDetail(5781).then(res => {
  console.log(res)
  songs.value = res.hotSongs
})

const data = reactive<{
  list: number[]
}>({list: []});

for (let i = 1; i < 5000; i++) {
  data.list.push(i);
}
const scroll = ref()
onMounted(() => {
  nextTick(() => {
    console.log(scroll.value)
    const bs = new BScroll(scroll.value, {
      probeType: 3,
      click: true
    })
  })
})

</script>

<template>
  <v-scroll>
    <template #top><div>fwef</div></template>
    <p class="scroll-item" v-for="(item, index) in data.list" :key="index">{{ item }}</p>
  </v-scroll>
</template>

<style scoped lang="less">
.scroll-wrapper {
  background: #ab8b8b;
  height: 400px;
  position: relative;
  overflow: hidden;


}

.scroll-item {
  height: 50px;
  border: 1px saddlebrown solid;
}

</style>
