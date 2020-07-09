import { initShaders } from '../lib/cuon-utils';
import WebGL from '../lib/webgl';
// import { loadWebGLConfig } from '../lib/cuon-func';
import { Matrix4 } from '../lib/cuon-matrix';
import { VSHADER_SOURCE, FSHADER_SOURCE } from './shader';
import { createVertexByGroupPoint } from './mode';

export default class ColorCircle extends WebGL {
  /**
   * 初始化彩环
   * @param {Document} dom 彩环挂载的dom节点
   * @param {Object} config webgl-context的渲染配置
   */
  constructor(dom, config) {
    super(dom, config);
    this.option = {};
    // webgl视窗大小
    this.viewWidth = undefined;
    this.viewHeight = undefined;
    // canvas节点
    this.canvas = undefined;
    // webgl上下文
    this.gl = undefined;
    // webgl挂载的dom节点
    this.dom = undefined;
    // 计算生成的模型顶点索引数目
    this.n = 0;
    // 扇叶数目
    this.fan = 300;
    // 内半径
    this.internalRadius = 0.5;
    // 外半径
    this.outerRadius = 0.9;
    // 编组之间的距离
    this.margin = 0;
    // 多少扇叶为一组
    this.interval = 0;
    // 设备绘制像素比
    this.devicePixelRatio = 2;
    // mvp矩阵变量存储空间
    this.uMvpMatrix = undefined;
    // mvp矩阵
    this.mvpMatrix = undefined;
    // 视图矩阵
    this.viewProjMatrix = undefined;
    // 模型矩阵
    this.modelMatrix = undefined;
    // 对象加载状态
    this.loading = true;
    // 绘制请求帧
    this.frameRequest = undefined;
    // 当前绘制索引值
    this.current = 0;
    // 上一次绘制的时间
    this.last = Date.now();
    // 绘制速度
    this.speed = 20;
    this.create(dom);
    // this.componentWillMount = this.componentWillMount.bind(this);
  }

  // componentWillMount = () => {
  //   console.log('yesyes');
  // }

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
      this.viewWidth = width;
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
      // this.requestToDraw();
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
    // 缓冲区数据预备役
    const uMvpMatrix = this.gl.getUniformLocation(this.gl.program, 'u_MvpMatrix');
    if (!uMvpMatrix) {
      console.log('failed to get the storage location of uniform variable');
      return;
    }
    this.uMvpMatrix = uMvpMatrix;
    const viewProjMatrix = new Matrix4();
    const mvpMatrix = new Matrix4();
    const modelMatrix = new Matrix4();
    viewProjMatrix.setPerspective(90.0, this.canvas.clientWidth / this.canvas.clientHeight, 1.0, 100.0);
    viewProjMatrix.lookAt(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    this.modelMatrix = modelMatrix;
    this.mvpMatrix = mvpMatrix;
    this.viewProjMatrix = viewProjMatrix;
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.loading = false;
    this.requestToDraw();
  }

  /**
   * 向缓冲区写入数据
   */
  initVertexBuffers = () => {
    const vertexData = createVertexByGroupPoint(this.fan, this.internalRadius, this.outerRadius);
    const { vertex, index } = vertexData;
    const vertices = new Float32Array(vertex);
    const indices = new Uint16Array(index);
    const indexBuffer = this.gl.createBuffer();
    if (!indexBuffer) {
      return -1;
    }
    if (!this.initArrayBuffer(vertices, 3, this.gl.FLOAT, 'a_Position')) {
      return -1;
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
    return indices.length;
  }

  /**
   * 使用缓冲区对象，向顶点着色器传入数据
   */
  initArrayBuffer = (data, num, type, attribute) => {
    const buffer = this.gl.createBuffer();
    if (!buffer) {
      console.log('Failed to create the buffer object.');
      return false;
    }
    // 将缓冲区对象绑定到目标
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    // 向缓冲区对象写入数据
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    // 获取attribute 变量
    const attrib = this.gl.getAttribLocation(this.gl.program, attribute);
    if (attrib < 0) {
      console.log('Failed to get the storage location of ' + attribute);
      return false;
    }
    // 将缓冲区对象分配给 attribute 变量
    this.gl.vertexAttribPointer(attrib, num, type, false, 0, 0);
    // 连接 attribute 变量与分配给它的缓冲区对象
    this.gl.enableVertexAttribArray(attrib);
    return true;
  }

  requestToDraw = () => {
    if (this.loading) {
      this.frameRequest = requestAnimationFrame(this.requestToDraw);
    } else {
      this.mvpMatrix.set(this.viewProjMatrix);
      this.mvpMatrix.multiply(this.modelMatrix);
      this.gl.uniformMatrix4fv(this.uMvpMatrix, false, this.mvpMatrix.elements);
      this.draw();
    }
  }

  draw = () => {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.animate();
    this.gl.drawElements(this.gl.TRIANGLES, this.n, this.gl.UNSIGNED_SHORT, 0);
    // console.log(this);
    // this.frameRequest = requestAnimationFrame(this.draw);
  }

  animate = () => {
    this.current = (this.current + 6) % this.n;
  }
};
