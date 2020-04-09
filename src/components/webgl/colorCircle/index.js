import { initShaders } from '../lib/cuon-utils';
import { createVertexByGroupPoint } from '../lib/cuon-func';
import { hslToRgba } from '../lib/shader-func';
import { Matrix4 } from '../lib/cuon-matrix';

export default class ColorCircle {
  // 初始化结构
  constructor(dom, config) {
    const {
      fan = 360,
      internalRadius = 0.5,
      outerRadius = 0.9,
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
    this.uMvpMatrix = undefined;
    this.mvpMatrix = undefined;
    this.viewProjMatrix = undefined;
    this.modelMatrix = undefined;
    // 变量区域
    this.loading = true;
    this.frameRequest = undefined;
    this.current = 0;
    this.last = Date.now();
    this.speed = 20;
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
    // 顶点着色器
    const VSHADER_SOURCE =
      'attribute vec4 a_Position;\n' +
      'uniform mat4 u_MvpMatrix;\n' +
      'varying vec4 v_Color;\n' +
      hslToRgba +
      'void main() {\n' +
      ' gl_Position = u_MvpMatrix * a_Position;\n' +
      ' vec3 start_Position = vec3(1.0, 0.0, 0.0);\n' +
      ' vec3 center_Position = vec3(0.0, 0.0, 0.0);\n' +
      ' vec3 end_Position = vec3(a_Position);\n' +
      ' float l_Start = distance(start_Position, center_Position);\n' +
      ' float l_End = distance(end_Position, center_Position);\n' +
      ' float _cos = dot(start_Position, end_Position) / l_Start / l_End;\n' +
      ' float _angle = degrees(acos(_cos));\n' +
      ' if(a_Position.y < 0.0) {\n' +
      '   _angle = 360.0 - _angle;\n' +
      ' }\n' +
      ' v_Color = vec4(hslToRgba((_angle / 360.0), 0.8, 0.5), 1.0);\n' +
      '}\n';
    // 片元着色器
    const FSHADER_SOURCE =
      'precision mediump float;\n' +
      'varying vec4 v_Color;\n' +
      'void main() {\n' +
      ' gl_FragColor = v_Color;\n' +
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
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
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
    console.log(vertexData);
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
    this.gl.drawElements(this.gl.TRIANGLES, this.current, this.gl.UNSIGNED_SHORT, 0);
    this.frameRequest = requestAnimationFrame(this.draw);
  }

  animate = () => {
    this.current = (this.current + 6) % this.n;
  }
};
