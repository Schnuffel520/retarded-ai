<template>
  <div class="circle-outside-warpper" ref="box">
    <div class="outside-left" ref="left"></div>
    <div class="outside-right" ref="right"></div>
  </div>
</template>

<script>
import { ArchBridge } from '@/components/webgl';
export default {
  name: 'circle-outside',
  data() {
    return {
      chart1: undefined,
      chart2: undefined,
      options: {},
    };
  },
  mounted() {
    this.creatChart();
  },
  methods: {
    creatChart() {
      const chart1 = new ArchBridge(this.$refs.left, this.options);
      const chart2 = new ArchBridge(this.$refs.right, this.options);
      this.chart1 = chart1;
      this.chart2 = chart2;
    },
  },
};
</script>

<style lang="less" scoped>
.circle-outside-warpper {
  position: absolute;
  // 鼠标事件全部注销
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  animation: scale-x 0.35s ease-out;
  .outside-right,
  .outside-left {
    position: relative;
    flex: 1;
    width: 50%;
    height: 100%;
  }
  .outside-right {
    transform: rotate(180deg);
  }
}
@keyframes scale-x {
  0% {
    opacity: 0;
  }
  2% {
    opacity: 0;
    transform: scaleX(0);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}
</style>
