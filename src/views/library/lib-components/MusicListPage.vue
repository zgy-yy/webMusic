<script setup lang="ts">

import {reactive, ref} from "vue";
import {getPlaylistCat, getQplaylist} from "@/server/api/list";
import PlaylistCover from "@/components/PlaylistCover.vue";

const tags = reactive<{ id: number, name: string }[]>([])

const loading = ref(true)
const lists = reactive([])
getPlaylistCat().then(res => {
  tags.push(...res)
})
const activeTagIndex = ref(0)

choseTag('华语', 0)

function choseTag(name: string, index: number) {
  lists.splice(0)
  loading.value = true

  activeTagIndex.value = index
  getQplaylist(name).then(res => {
    lists.push(...res.playlists)
    loading.value = false
  })
}

</script>

<template>
  <div class="playlist-main">
    <ul class="tags no-scroll-bar">
      <li :class="activeTagIndex==index?'act-tag':''" v-for="(tag,index) in tags" :key="tag.id"
          @click="choseTag(tag.name,index)">
        <span>{{ tag.name }}</span>
      </li>
    </ul>

    <div class="lists" :class="loading?'mini-loading':''">
      <template v-for="item in lists" :key="item.id">
        <playlist-cover :id="item?.id" :pic-url="item?.coverImgUrl" :play-count="item?.playCount" :name="item?.name"
                        alg=""/>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.playlist-main {
  overflow: scroll;

  .tags {
    display: flex;
    flex-wrap: wrap;

    span {
      white-space: nowrap;
      display: inline-block;
      padding: 6px 16px;
    }
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

.act-tag {
  color: #1574ff;
}
</style>