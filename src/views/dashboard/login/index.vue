<template>
  <div class="login-warpper" ref="webgl">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
  </div>
</template>

<script>
import Polyhedron from '@/components/webgl/polyhedron';
// import Color from '@/components/webgl/lib/color';
export default {
  name: 'login',
  data() {
    return {
      chart: undefined,
      color: undefined,
    };
  },
  mounted() {
    this.chart = new Polyhedron(this.$refs.webgl);
    // this.color = new Color('hsl(200,50%,50%,0.8)');
    console.log(this.chart);
  },
};
</script>

<style lang="less" scoped>
.login-warpper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
