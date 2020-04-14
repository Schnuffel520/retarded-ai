<template>
  <div class="loginlayout-warpper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'loginlayout',
};
</script>

<style lang="less" scoped>
.loginlayout-warpper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
