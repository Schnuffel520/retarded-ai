<template>
  <div class="mask-card-warpper">{{label}}</div>
</template>

<script>
export default {
  name: 'mask-card',
  props: {
    label: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.mask-card-warpper {
  position: relative;
  animation: ease-show-move 0.3s ease-out forwards;
  &::after,
  &::before {
    position: absolute;
    right: -20px;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    animation: block-scale-x 0.3s ease-out forwards;
    animation-delay: 0.3s;
    transform-origin: right center;
  }
  &::after {
    left: -20px;
    transform-origin: left center;
  }
}
@keyframes block-scale-x {
  0% {
    transform: scaleX(1);
  }

  100% {
    transform: scaleX(0);
  }
}
@keyframes ease-show-move {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
