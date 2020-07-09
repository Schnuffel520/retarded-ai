<template>
  <div class="sc-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autoComplete?'on':'off'"
      class="sc-input_inner"
    />
  </div>
</template>

<script>
export default {
  name: 'sc-input',
  props: {
    autoComplete: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.sc-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  .sc-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &:focus {
      outline: none;
      border-color: #409eff;
    }
  }
  input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark-color(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: -internal-light-dark-color(
      rgb(255, 255, 255),
      rgb(59, 59, 59)
    );
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: -internal-light-dark-color(
      rgb(118, 118, 118),
      rgb(195, 195, 195)
    );
    border-image: initial;
  }
}
</style>
