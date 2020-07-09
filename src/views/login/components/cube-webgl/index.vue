<template>
  <div class="cube-webgl-warpper" ref="webgl"></div>
</template>

<script>
import { CubeRuins } from '@/components/webgl';
export default {
  name: 'cube-webgl',
  data() {
    return {
      chart: undefined,
      options: {},
    };
  },
  mounted() {
    this.initCharts();
  },
  beforeDestroy() { },
  methods: {
    initCharts() {
      if (!this.chart) {
        const dom = this.$refs.webgl;
        this.chart = new CubeRuins(dom, this.options);
        console.log(this.chart);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cube-webgl-warpper {
  width: 300px;
  height: 200px;
}
</style>
