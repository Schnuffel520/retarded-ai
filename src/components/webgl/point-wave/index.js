import WebGL from '../lib/webgl';
import { Matrix4 } from '../lib/cuon-matrix';
import { initShaders, initArrayBuffer } from '../lib/cuon-utils';
import { VSHADER_SOURCE, FSHADER_SOURCE } from './shader';
import { vertices, indices } from './mode';

export default class PointWave extends WebGL {
  constructor(dom, options, config) {
    super(dom, options, config);
    this.viewMatrix = undefined;
    this.mvpMatrix = undefined;
    this.normalMatrix = undefined;
    this.globalMatrix = undefined;
    this.create(dom);
  }

  registerShaderProgram = () => {
    if (!initShaders(this.gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      throw new Error('Failed to init shader program');
    }
  }

  loadModel = () => {
    const indexBuffer = this.gl.createBuffer();
    if (!indexBuffer) {
      return -1;
    }
    if (!initArrayBuffer(this.gl, vertices, 'a_Position', this.gl.FLOAT, 3)) {
      return -1;
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
    if (indices.length < 0) {
      throw new Error('Failed to init vertex data');
    } else {
      this.n = indices.length;
    }
  }

  getLocationUniformAndAttribute = () => {
    const u_Time = this.gl.getUniformLocation(this.gl.program, 'u_Time');
    const u_MvpMatrix = this.gl.getUniformLocation(this.gl.program, 'u_MvpMatrix');
    const u_NormalMatrix = this.gl.getUniformLocation(this.gl.program, 'u_NormalMatrix');
    const u_ModelMatrix = this.gl.getUniformLocation(this.gl.program, 'u_ModelMatrix');
    const u_LightColor = this.gl.getUniformLocation(this.gl.program, 'u_LightColor');
    const u_LightPosition = this.gl.getUniformLocation(this.gl.program, 'u_LightPosition');
    const u_AmbientLight = this.gl.getUniformLocation(this.gl.program, 'u_AmbientLight');
    if (u_Time < 0 || u_MvpMatrix < 0 || u_NormalMatrix < 0 || u_ModelMatrix < 0 || u_LightColor < 0 || u_LightPosition < 0 || u_AmbientLight < 0) {
      throw new Error('Failed to get the uniform location in storage');
    }
    this.u_Time = u_Time;
    this.u_MvpMatrix = u_MvpMatrix;
    this.u_NormalMatrix = u_NormalMatrix;
    this.u_ModelMatrix = u_ModelMatrix;
    this.u_LightColor = u_LightColor;
    this.u_LightPosition = u_LightPosition;
    this.u_AmbientLight = u_AmbientLight;
  }

  render = () => {
    this.preDraw();
    this.drawElements();
  }

  preDraw = () => {
    this.setView();
    this.setLight();
    this.setConfig();
  }

  setView = () => {
    const viewMatrix = new Matrix4();
    viewMatrix.setPerspective(30, this.drawWidth / this.drawHeight, 1, 600);
    viewMatrix.lookAt(5, 5, 20, 0, 0, 0, 0, 1, 0);
    this.viewMatrix = viewMatrix;
  }

  setLight = () => {
    this.gl.uniform3f(this.u_AmbientLight, 0.3, 0.3, 0.3);
    this.gl.uniform3f(this.u_LightColor, 1.0, 1.0, 1.0);
    this.gl.uniform3f(this.u_LightPosition, 10.0, 20.0, 5.0);
  }

  setConfig = () => {
    this.gl.clearColor(1, 1, 1, 0.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.drawLast = Date.now();
    const mvpMatrix = new Matrix4();
    const normalMatrix = new Matrix4();
    this.mvpMatrix = mvpMatrix;
    this.normalMatrix = normalMatrix;
  }

  drawElements = () => {
    const modelMatrix = new Matrix4();
    const now = (Date.now() / 1000 % (Math.PI * 2));
    this.gl.uniform1f(this.u_Time, now);
    this.mvpMatrix.set(this.viewMatrix);
    this.mvpMatrix.multiply(modelMatrix);
    this.gl.uniformMatrix4fv(this.u_MvpMatrix, false, this.mvpMatrix.elements);
    this.normalMatrix.setInverseOf(modelMatrix);
    this.normalMatrix.transpose();
    this.gl.uniformMatrix4fv(this.u_NormalMatrix, false, this.normalMatrix.elements);
    this.gl.drawElements(this.gl.POINTS, this.n, this.gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(this.drawElements);
  }
}
