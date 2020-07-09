import { loadWebGLConfig, isElement } from './cuon-func';
/**
 * WebGL类，基本的绘制类
 */
export default class WebGL {
  constructor(dom, options, config) {
    this.WEBGL_CONTEXT_CONFIG = loadWebGLConfig(config);
    this.dom = undefined;
    this.canvas = undefined;
    this.drawWidth = 0;
    this.drawHeight = 0;
    this.gl = undefined;
    this.options = { ...options };
    // this.create(dom);
  }

  create = (dom) => {
    const flag = isElement(dom);
    if (flag) {
      this.dom = dom;
      try {
        this.createCanvas();
        this.linkCanvas();
        this.getWebGLContext();
        this.resetViewport();
        this.registerShaderProgram();
        this.loadModel();
        this.getLocationUniformAndAttribute();
        this.render();
      } catch (error) {
        console.log(error);
        throw new Error('Faile to init WebGL ' + error);
      }
    } else {
      throw new Error('Expected Element, got ' + typeof dom);
    }
  }

  createCanvas = () => {
    // 创建canvas绘制节点
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this.canvas = canvas;
    // 重置canvas的视窗，保持和挂载节点一致的大小。
    this.resizeCanvas();
  }

  getWebGLContext = () => {
    const gl = this.canvas.getContext('webgl', { ...this.WEBGL_CONTEXT_CONFIG }) || this.canvas.getContext('experimental-webgl', { ...this.WEBGL_CONTEXT_CONFIG });
    if (!gl) {
      throw new Error('Failed to get the WebGLContextRendering');
    } else {
      this.gl = gl;
    }
  }

  getLocationUniformAndAttribute = () => { }

  linkCanvas = () => {
    // 先清空挂载节点下的所有孩子节点，保持挂载环境清洁，保证渲染前仅挂载一个节点。
    const child = this.dom.childNodes || [];
    // 倒序删除节点
    for (let i = child.length - 1; i >= 0; i--) {
      this.dom.removeChild(child[i]);
    }
    // 装载canvas绘制节点
    this.dom.appendChild(this.canvas);
  }

  loadModel = () => { }

  registerShaderProgram = () => { }

  render = () => { }

  resetViewport = () => {
    const boundRect = this.dom.getBoundingClientRect();
    this.drawWidth = boundRect.width;
    this.drawHeight = boundRect.height;
    // 设置绘制视窗
    this.gl.viewport(0, 0, boundRect.width, boundRect.height);
  }

  resizeCanvas = () => {
    // 获取dom的基本信息
    const boundRect = this.dom.getBoundingClientRect();
    this.canvas.width = boundRect.width;
    this.canvas.height = boundRect.height;
  }

  resize = () => {
    this.resizeCanvas();
    this.resetViewport();
  }
}
