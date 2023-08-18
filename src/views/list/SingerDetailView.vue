<script setup lang="ts">

import SongItem from "@/components/SongItem.vue";
import {computed, reactive, ref, toRefs} from "vue";
import useListStore from "@/stores/listStore";
import useSongStore from "@/stores/songStore";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import VScroll from "@/components/VScroll.vue";

const detail = reactive({
  name: '',
  alias: [''],
  desc: ''
})

const props = defineProps<{
  id: string
}>()
const {id} = toRefs(props)

const songStore = useSongStore()

const isLoading = ref(true)
const listStore = useListStore()
const {singerDetail} = storeToRefs(listStore)
listStore.getDeatilSinger(Number(id.value)).then(() => {
  detail.name = singerDetail.value?.artist.name || ''
  detail.alias = singerDetail.value?.artist.alias || []
  detail.desc = singerDetail.value?.artist.briefDesc || ''
  isLoading.value = false
})
const bgUrl = computed(() => `url('${singerDetail.value?.artist.picUrl}')`)
const songs = computed(() => {
  return singerDetail.value?.hotSongs ?? []
})

const router = useRouter()

function goBack() {
  router.back()
}

function setSongList() {
  songStore.setSonglist(songs.value)
}

const switchItems = [
  {name: '单曲', active: true},
  {name: '专辑', active: false},
  {name: '评论', active: false}
]

</script>

<template>
  <div class="list-main" v-loading="isLoading">
    <div class="top">
      <div class="bg-img"></div>
      <div class="top-content">
        <p class="nav">
          <img @click="goBack" class="icon" src="/src/assets/icon/back.svg" alt=""/>
          <img class="icon" src="/src/assets/icon/share.svg" alt=""/>
        </p>
      </div>
    </div>

    <v-scroll>
      <template #top>
        <div class="ignore">
          <div class="attention">关注</div>
          <div class="singer-msg">
            <p class="no-wrap name"> {{ detail.name }}</p>
            <p class="no-wrap alias">
            <span v-for="(al,index) in detail.alias"
                  :key="al"> {{ al }} {{ index == detail.alias.length - 1 ? '' : ' / ' }}</span>
            </p>
            <p class=" desc"> {{ detail.desc }}</p>
          </div>
          <div class="switch-bar">
            <template v-for="item in switchItems" :key="item.name">
              <p :class="item.active?'active-sw-bar':''">{{ item.name }}</p>
            </template>
          </div>
        </div>
      </template>
      <template #default>
        <song-item class="items" v-for="itemData in songs" @set-song-list="setSongList"
                   :key="itemData.id"
                   :id="itemData.id"
                   :pic="itemData.al.picUrl" :name="itemData.name" :singer="itemData.ar"></song-item>
      </template>

    </v-scroll>
  </div>
</template>

<style scoped lang="less">
.list-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .top {
    position: relative;

    .bg-img {
      top: 0;
      z-index: -1;
      position: absolute;
      width: 100%;
      background-image: v-bind(bgUrl);
      background-position: center;
      background-size: 110%;
      background-repeat: no-repeat;
      //filter: blur(20px);
      height: 344px;
      overflow: hidden;
    }

    .top-content {
      text-align: center;
      background-color: rgba(255, 255, 255, 0.1);

      .nav {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
          width: 24px;
          height: 24px;
          padding: 0 16px;
        }
      }
    }
  }

  .ignore {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: end;

    .attention {
      margin-top: 32px;
      margin-bottom: 28px;
      margin-right: 16px;
      right: 16px;
      bottom: 178px;
      width: 52px;
      height: 24px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 40px;
      background: rgba(0, 213, 255, 1);
      line-height: 24px;

    }

    .singer-msg {
      margin-right: 16px;
      box-sizing: border-box;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      right: 16px;
      bottom: 48px;
      width: 133px;
      height: 122px;
      border-radius: 16px;
      padding: 0 12px;
      text-align: start;
      background: linear-gradient(135deg, rgba(222, 236, 236, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
      backdrop-filter: blur(10px);

      .name {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.24px;
        margin-top: 11px;
        flex-shrink: 0;
      }

      .alias {
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 500;
        margin: 8px 0;
      }

      .desc {
        flex: 1;
        font-size: 12px;
        font-weight: 500;
        padding-right: 3px;
        overflow: scroll;

      }
    }

    .switch-bar {
      margin-top: 32px;
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.24px;
      line-height: 20px;
      color: rgba(128, 128, 128, 1);

      .active-sw-bar {
        position: relative;
        color: black;

        &::after {
          position: absolute;
          left: 0;
          bottom: 0.5px;
          content: ' ';
          display: block;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(0, 213, 255, 0.82);
        }
      }
    }
  }

}

.items {
  margin: auto;
  padding: 2px 16px;
}
</style>