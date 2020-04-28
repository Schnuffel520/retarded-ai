/**
 * webgl-context的上下文属性
 * @param {Object} config 用户设置的属性集合
 * @returns {Object} 组合后的上下文属性
 * @author schnuffel
 * @version 0.1.0
 */
export function loadWebGLConfig(config) {
  const {
    // [boolean]-canvas是否包含一个alpha缓冲区
    alpha = true,
    // [boolean]-是否开启抗锯齿
    antialias = true,
    // [boolean]-绘制缓冲区是否包含一个深度至少为16位的缓冲区
    depth = true,
    // [boolean]-在一个系统性能低的环境是否创建该上下文
    failIfMajorPerformanceCaveat = false,
    // [string]-浏览器在运行WebGL上下文时使用相应的GPU电源配置：
    // default 自动选择，默认值
    // high-performance 高性能模式
    // low-power 节能模式
    powerPreference = 'default',
    // [boolean]-排版引擎假设绘制缓冲区是否包含预混合alpha通道
    premultipliedAlpha = true,
    // [boolean]-如果这个值为true缓冲区将不会被清除，会保存下来，直到被清除或被使用者覆盖
    preserveDrawingBuffer = false,
    // [boolean]-绘制缓冲区是否包含一个深度至少为8位的模版缓冲区
    stencil = false,
  } = config || {};
  return {
    alpha,
    antialias,
    depth,
    failIfMajorPerformanceCaveat,
    powerPreference,
    premultipliedAlpha,
    preserveDrawingBuffer,
    stencil,
  };
}

/**
 * 检测dom是否为元素
 * @param {Element} dom 节点
 * @returns {Boolean} true:是元素，false:不是元素
 * @version 0.1.0
 */
export function isElement(dom) {
  if (dom && dom.nodeType === 1) {
    if (window.Node && (dom instanceof Node)) {
      return true;
    } else {
      const test = document.createElement('div');
      // 检验是否具备元素操作机制
      // 一定程度上过滤对象
      try {
        test.appendChild(dom);
        test.removeChild(dom);
      } catch (error) {
        return false;
      }
      return true;
    }
  } else {
    return false;
  }
}
