<template>
  <div class="sc-content-warpper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sc-content',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.sc-content-warpper {
  position: relative;
  width: 100%;
  margin: 10px 10px 0 10px;
  border-radius: 4px;
  background-color: #eeeeee;
  overflow: auto;
}
</style>
