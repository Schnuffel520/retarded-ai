<template>
  <div class="basiclayout-warpper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'basiclayout',
};
</script>

<style lang="less" scoped>
.basiclayout-warpper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
