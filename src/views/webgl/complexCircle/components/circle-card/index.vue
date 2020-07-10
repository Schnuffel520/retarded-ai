<template>
  <div class="circle-card-warpper">
    <CircleOutside></CircleOutside>
  </div>
</template>

<script>
import CircleOutside from './circle-outside';
export default {
  name: 'circle-card',
  data() {
    return {};
  },
  components: {
    CircleOutside,
  },
};
</script>

<style lang="less" scoped>
.circle-card-warpper {
  position: relative;
  margin: 80px;
  width: 1186px;
  height: 720px;
  // background-color: black;
}
</style>
