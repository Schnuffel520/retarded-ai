<template>
  <div class="login-warpper">
    <CubeWebGL style="position: absolute; width:100%;height:100%;top:0;left:0;"></CubeWebGL>
    <MaskCard class="normal" :label="name"></MaskCard>
    <TextCard class="normal" :onClick="login" style="margin-top:40px;" label="前往量子之海"></TextCard>
  </div>
</template>

<script>
import { SYSTEM_NAME } from '@/constants/config';
import { TextCard, MaskCard, CubeWebGL } from './components';
export default {
  name: 'login',
  data() {
    return {
      name: SYSTEM_NAME,
    };
  },
  methods: {
    login() {
      this.$router.push({ path: '/webgl' });
    },
  },
  components: {
    TextCard,
    MaskCard,
    CubeWebGL,
  },
};
</script>

<style lang="less" scoped>
.login-warpper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: #aaaaaa;
  .normal {
    color: #ffffff;
    border-color: #ffffff;
  }
}
</style>
