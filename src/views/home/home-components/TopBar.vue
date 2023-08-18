<script setup lang="ts">

import {getHotSerch, getSearchRes} from "@/server/api/serch";
import {reactive, ref} from "vue";
import SongItem from "@/components/SongItem.vue";
import useSongStore from "@/stores/songStore";

const showData = ref()
getHotSerch().then(res => {
  showData.value = res.data
})
const showContainer = ref(false)

const searchWord = ref('')
const resultSongs = reactive([])

function search(kw?: string) {

  if (kw) {
    getSearchRes(kw).then(res => {
      resultSongs.splice(0)
      resultSongs.push(...res.result.songs)
    })
    return
  }
  getSearchRes(searchWord.value).then(res => {
    resultSongs.splice(0)
    resultSongs.push(...res.result.songs)
  })
}

const songStore = useSongStore()

function setPlayList() {
  songStore.setSonglist(resultSongs.value)
}

function onclick() {
  showContainer.value = false
  resultSongs.splice(0)
}

</script>

<template>
  <div class="main-top">
    <img alt="" class="icon icon-opt" src="src/assets/icon/option.svg"/>
    <span class="input-bar">
      <embed class="icon" type="image/svg+xml" src="src/assets/icon/search.svg"/>
      <input @keyup.enter="search()" v-model="searchWord" @focus.stop="showContainer=true"
             placeholder="搜索"/>
    </span>
    <img class="icon icon-scan" type="image/svg+xml" src="src/assets/icon/scan.svg" alt=""/>
    <img class="icon icon-listen" type="image/svg+xml" src="src/assets/icon/listen.svg" alt=""/>

    <div class="container" v-if="showContainer" @click.stop="onclick">
      <div class="show" v-if="resultSongs.length==0">
      <span @click.stop="search(item.searchWord)" v-for="item in showData" :key="item.content">{{
          item.searchWord
        }}</span>
        {{ searchWord }}
      </div>
      <div class="show" v-if="resultSongs.length>0">
        <template v-for="item in resultSongs" :key="item.id">
          <song-item @set-song-list="setPlayList" class="song-items" :name="item.name"
                     :id="item.id"
                     :singer="item.ar" :mp3-url="''" :pic="item.al.picUrl"
          ></song-item>
        </template>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">
.main-top {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;


  .icon {
    width: 24px;
    height: 24px;
  }

  .input-bar {
    flex: 1;
    margin-left: calc(64px - 16px - 24px);
    border-radius: 20px;
    height: 28px;
    width: 207px;
    display: flex;
    align-items: center;

    input {
      height: 100%;
      line-height: 100%;
    }
  }

  .container {
    background: white;
    overflow: scroll;
    position: absolute;
    top: 44px;
    padding-bottom: 50%;
    //margin: 0 auto;
    left: 0;
    right: 0;
  }
}

.show {
  padding: 0 24px;
  max-height: 30vh;

  span {
    display: inline-block;
    margin: 6px;
    padding: 5px;
    border-radius: 3px;
    color: #5e655c;
  }
}

.icon-opt {
  margin-left: 16px;
}

.icon-scan {
  margin-left: 24px;
  margin-right: 12px;
}

.icon-listen {
  margin-right: 16px;
}
</style>