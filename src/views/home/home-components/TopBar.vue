<script setup lang="ts">

</script>

<template>
  <div class="main-top">
    <embed class="icon icon-opt" type="image/svg+xml" src="src/assets/icon/option.svg"/>
    <span class="input-bar">
      <embed class="icon" type="image/svg+xml" src="src/assets/icon/search.svg"/>
      <input placeholder="搜索"/>
    </span>
    <embed class="icon icon-scan" type="image/svg+xml" src="src/assets/icon/scan.svg"/>
    <embed class="icon" type="image/svg+xml" src="src/assets/icon/listen.svg"/>
  </div>
</template>

<style scoped lang="less">
.main-top {
  width: 375px;
  height: 44px;
  display: flex;
  align-items: center;


  .icon {
    width: 24px;
    height: 24px;
  }

  .input-bar {
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
}

.icon-opt {
  margin-left: 16px;
}

.icon-scan {
  margin-left: 24px;
  margin-right: 12px;
}
</style>