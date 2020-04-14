<template>
  <div class="color-circle-warpper" ref="webgl"></div>
</template>

<script>
import ColorCircle from '@/components/webgl/colorCircle';
export default {
  name: 'color-circle',
  data() {
    return {
      chart: undefined,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = new ColorCircle(this.$refs.webgl);
      this.chart.componentWillMount();
    },
  },
};
</script>

<style lang="less" scoped>
.color-circle-warpper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
