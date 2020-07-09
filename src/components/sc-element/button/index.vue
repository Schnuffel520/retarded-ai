<template>
  <div class="sc-button">
    <button type="button">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'sc-button',
  props: {
    // button / submit / reset
    // 原生 type 属性
    nativeType: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="less" scoped>
</style>
