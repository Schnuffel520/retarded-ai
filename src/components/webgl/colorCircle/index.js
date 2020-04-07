import { initShaders } from '../lib/cuon-utils';

export default class ColorCircle {
  // 初始化结构
  constructor(dom, config) {
    const {
      fan = 360,
      internalRadius = 0.5,
      outerRadius = 1,
      margin = 0,
      interval = 0,
      devicePixelRatio = window.devicePixelRatio || 2,
    } = config || {};
    // 视窗大小
    this.viewWidth = undefined;
    this.viewHeight = undefined;
    // 绘图工具&对象
    this.canvas = undefined;
    this.gl = undefined;
    this.dom = undefined;
    this.n = 0;
    this.fan = fan;
    this.internalRadius = internalRadius;
    this.outerRadius = outerRadius;
    this.margin = margin;
    this.interval = interval;
    this.devicePixelRatio = devicePixelRatio;
    this.create(dom);
  }

  /**
   * 初步装载绘制工具集
   * @param {Document} dom 图形装载节点
   */
  create = (dom) => {
    if (dom && dom.getBoundingClientRect) {
      this.dom = dom;
      // 获取绑定节点的宽高
      const domSize = dom.getBoundingClientRect();
      const { left, top, right, bottom } = domSize;
      const width = right - left;
      const height = bottom - top;
      // 设置视窗大小
      this.viewHeight = width;
      this.viewHeight = height;
      // 创建canvas画布
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'relative';
      canvas.width = width;
      canvas.height = height;
      this.canvas = canvas;
      this.dom.appendChild(this.canvas);
      // 获取webgl绘制上下文
      const gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      if (!gl) {
        console.log('Failed to get the webgl context');
        return;
      }
      this.gl = gl;
      this.initWebgl();
    } else {
      console.log('图形需要一个dom节点进行装载');
    }
  };

  /**
   * 初始化着色器以及一些基本配置
   */
  initWebgl = () => {
    // 设置绘制窗口四个位置
    this.gl.viewport(0, 0, this.viewWidth, this.viewHeight);
    // 顶点着色器
    const VSHADER_SOURCE =
      'attribute vec4 a_Position;\n' +
      'void main() {\n' +
      ' gl_Position = a_Position;\n' +
      '}\n';
    // 片元着色器
    const FSHADER_SOURCE =
      'precision mediump float;\n' +
      'void main() {\n' +
      ' gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' +
      '}\n';
    if (!initShaders(this.gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to init shaders');
      return;
    }
    const n = this.initVertexBuffers();
    if (n < 0) {
      console.log('Failed to insatll the vertex data');
      return;
    }
    this.n = n;
  }

  initVertexBuffers = () => {

  }
};
