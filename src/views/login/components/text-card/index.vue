<template>
  <div class="text-card-warpper">
    <div @click="onClick" class="text-card-inner">{{label}}</div>
  </div>
</template>

<script>
export default {
  name: 'text-card',
  props: {
    label: {
      type: String,
      default: undefined,
    },
    onClick: {
      type: Function,
      required: false,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="less" scoped>
.text-card-warpper {
  position: relative;
  user-select: none;
  cursor: pointer;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 5px 8px;
  transform: translateY(30px) scaleX(0);
  opacity: 0;
  animation: ease-show-move-sacle 0.3s ease-in-out forwards;
  animation-delay: 0.2s;
  &::before,
  &::after {
    position: absolute;
    top: calc(50% - 7px);
    right: -25px;
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50% 50%;
    border: 1px solid #ffffff;
    background-color: black;
  }
  &::before {
    left: -25px;
  }
  &:hover {
    color: #ffffff;
  }
  .text-card-inner {
    position: relative;
    opacity: 0;
    padding: 5px 8px;
    animation: ease-show 0.3s ease-in-out forwards;
    animation-delay: 0.5s;
  }
}
@keyframes ease-show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes ease-show-move-sacle {
  0% {
    transform: translateY(30px) scaleX(0);
    opacity: 0;
  }

  100% {
    transform: translateY(0) scaleX(1);
    opacity: 1;
  }
}
</style>
