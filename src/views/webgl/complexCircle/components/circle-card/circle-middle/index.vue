<template>
  <div class="circle-middle-warpper" ref="webgl"></div>
</template>

<script>
import { PointWave } from '@/components/webgl';
export default {
  name: 'circle-middle',
  data() {
    return {
      chart: undefined,
      options: {},
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // console.log(this.$refs.webgl);
      const chart = new PointWave(this.$refs.webgl, this.options);
      this.chart = chart;
    },
  },
};
</script>

<style lang="less" scoped>
.circle-middle-warpper {
  position: absolute;
  left: calc(50% - 154px);
  top: calc(50% - 154px);
  width: 306px;
  height: 306px;
  border: 1px solid #b1b47b;
  border-radius: 50% 50%;
  overflow: hidden;
}
</style>
