<template>
  <div class="sc-head-warpper">
    <span class="sc-head-name">{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'sc-head',
  props: {
    name: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="less" scoped>
.sc-head-warpper {
  position: relative;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(19, 38, 66, 1);
  border-bottom: 1px solid black;
  .sc-head-name {
    position: relative;
    font-size: 24px;
    color: #ffffff;
  }
}
</style>
