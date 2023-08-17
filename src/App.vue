<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import PlayView from '@/views/play/PlayView.vue'
import {storeToRefs} from 'pinia'
import MimiPlayer from '@/components/MimiPlayer.vue'
import useSongStore from '@/stores/songStore'
import {reactive, ref} from "vue";

const route = useRoute()
const songStore = useSongStore()
const {curSong} = storeToRefs(songStore)

const normalPlayerShow = ref(false)

const startPosi = reactive({
  x: 0,
  y: 0
})

function showNormalPlayer(props: { x: number, y: number }) {
  startPosi.x = props.x
  startPosi.y = props.y
  normalPlayerShow.value = true
}
</script>

<!--      :class="!route.meta.hiddenTabBar ? '' : 'hidden-bar'"-->
<template>
  <router-view
      class="main-view no-scroll-bar"
      v-slot="{ Component }"
  >
    <keep-alive exclude="ListView,SongListView,SingerListView">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <mimi-player @click-me="props => {showNormalPlayer(props)}" class="mini-player" v-if="curSong"></mimi-player>
  <tab-bar v-if="!route.meta.hiddenTabBar" class="tab-bar"/>
  <play-view :x="startPosi.x" :y="startPosi.y" @close-me="() => normalPlayerShow=false" :show-me="normalPlayerShow"
             class="normal-player"></play-view>
</template>

<style scoped lang="less">

.main-view {
  flex: 1;
}

.mini-player {
}

.tab-bar {

  width: 100%;
}

.hidden-bar {
  bottom: 0;
}

.normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.bar-leave-active,
.bar-enter-active {
  transition: transform 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  z-index: -1;
}

.bar-leave-to,
.bar-enter-from {
  transform: translateY(100%);
}

//
//.player-leave-active,
//.player-enter-active {
//  transition: transform 0.6s cubic-bezier(1, 0.5, 0.8, 1);
//  z-index: 99;
//}
//
//.player-leave-to,
//.player-enter-from {
//  transform: translateY(100%);
//}


</style>
