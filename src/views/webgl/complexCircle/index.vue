<template>
  <div class="complex-circle-warpper">
    <CircleCard></CircleCard>
  </div>
</template>

<script>
import { CircleCard } from './components';
export default {
  name: 'complex-circle',
  data() {
    return {};
  },
  components: {
    CircleCard,
  },
};
</script>

<style lang="less" scoped>
.complex-circle-warpper {
  position: relative;
  width: 100%;
}
</style>
