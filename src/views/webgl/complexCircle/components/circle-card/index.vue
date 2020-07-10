<template>
  <div class="circle-card-warpper">
    <CircleOutside></CircleOutside>
    <CircleMiddle></CircleMiddle>
  </div>
</template>

<script>
import CircleOutside from './circle-outside';
import CircleMiddle from './circle-middle';
export default {
  name: 'circle-card',
  data() {
    return {};
  },
  components: {
    CircleOutside,
    CircleMiddle,
  },
};
</script>

<style lang="less" scoped>
.circle-card-warpper {
  position: relative;
  margin: 80px;
  width: 1186px;
  height: 720px;
  // box-sizing: 0;
  // display: table;
  background-color: #141c26;
}
</style>
