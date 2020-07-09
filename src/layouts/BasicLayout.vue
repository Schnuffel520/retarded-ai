<template>
  <div class="basiclayout-warpper">
    <SCHead :name="name"></SCHead>
    <div class="basiclayout-body-warpper">
      <SCMenu></SCMenu>
      <SCContent>
        <router-view></router-view>
      </SCContent>
    </div>
  </div>
</template>

<script>
import { SCHead, SCMenu, SCContent } from './components';
import { SYSTEM_NAME } from '@/constants/config';
export default {
  name: 'basiclayout',
  data() {
    return {
      name: SYSTEM_NAME,
    };
  },
  components: {
    SCHead,
    SCMenu,
    SCContent,
  },
};
</script>

<style lang="less" scoped>
.basiclayout-warpper {
  position: relative;
  width: 100%;
  height: 100%;
  .basiclayout-body-warpper {
    position: relative;
    display: flex;
    width: 100%;
    height: calc(100% - 71px);
    flex: 1;
    flex-direction: row;
  }
}
</style>
