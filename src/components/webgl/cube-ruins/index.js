import WebGL from '../lib/webgl';
import { Matrix4, Vector3 } from '../lib/cuon-matrix';
import { initShaders, initArrayBuffer } from '../lib/cuon-utils';
import { VSHADER_SOURCE, FSHADER_SOURCE } from './shader';
import { vertices, normals, indices } from './mode';

export default class CubeRuins extends WebGL {
  constructor(dom, options, config) {
    super(dom, options, config);
    this.loading = false;
    this.drawLast = undefined;
    this.cubeMaxLength = 180;
    this.cubeList = [];
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
    if (!initArrayBuffer(this.gl, normals, 'a_Normal', this.gl.FLOAT, 3)) {
      return -1;
    }
    // if (!initArrayBuffer(this.gl, colors, 'a_Color', this.gl.FLOAT, 3)) {
    //   return -1;
    // }
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
    const u_MvpMatrix = this.gl.getUniformLocation(this.gl.program, 'u_MvpMatrix');
    const u_NormalMatrix = this.gl.getUniformLocation(this.gl.program, 'u_NormalMatrix');
    const u_ModelMatrix = this.gl.getUniformLocation(this.gl.program, 'u_ModelMatrix');
    const u_LightColor = this.gl.getUniformLocation(this.gl.program, 'u_LightColor');
    const u_LightPosition = this.gl.getUniformLocation(this.gl.program, 'u_LightPosition');
    const u_AmbientLight = this.gl.getUniformLocation(this.gl.program, 'u_AmbientLight');
    if (u_MvpMatrix < 0 || u_NormalMatrix < 0 || u_ModelMatrix < 0 || u_LightColor < 0 || u_LightPosition < 0 || u_AmbientLight < 0) {
      throw new Error('Failed to get the uniform location in storage');
    }
    this.u_MvpMatrix = u_MvpMatrix;
    this.u_NormalMatrix = u_NormalMatrix;
    this.u_ModelMatrix = u_ModelMatrix;
    this.u_LightColor = u_LightColor;
    this.u_LightPosition = u_LightPosition;
    this.u_AmbientLight = u_AmbientLight;
  }

  render = () => {
    this.createCube();
    this.setCubeLastPosition();
    this.preDraw();
    setInterval(
      () => {
        // this.setCubeLastPosition();
        this.loading = !this.loading;
      }, 30000,
    );
    this.drawElements();
  }

  createCube = () => {
    const list = [];
    for (let i = 0; i < this.cubeMaxLength; i++) {
      const modelMatrix = new Matrix4();
      const position = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 20 - 10];
      const positionVector = new Vector3(position);
      modelMatrix.setTranslate(position[0], position[1], position[2]);
      const scale = Math.random() * 0.1 + 0.1;
      modelMatrix.scale(scale, scale, scale);
      const rotate = Math.random() * 5;
      modelMatrix.rotate(rotate, 0, 1, 1);
      const firstPointer = modelMatrix.multiplyVector3(positionVector);
      const rotateSpeed = 30 * Math.random() + 10;
      list.push({ modelMatrix, position, scale, rotate, rotateSpeed, firstPointer: firstPointer.elements });
    }
    this.cubeList = list;
  }

  setCubeLastPosition = () => {
    const angle = 360 / this.cubeMaxLength;
    const pointerMatrix1 = new Matrix4();
    const pointerMatrix2 = new Matrix4();
    const pointerMatrix3 = new Matrix4();
    const pointerVector1 = new Vector3([1.1, 1.1, 0]);
    const pointerVector2 = new Vector3([1, 0, 1]);
    const pointerVector3 = new Vector3([0, 0.9, 0.9]);
    this.cubeList.forEach(
      (item, index) => {
        const { rotate, scale } = item;
        let lastPointer;
        if (index < this.cubeMaxLength / 3) {
          pointerMatrix1.rotate(angle * 3, 0, 0, 1);
          lastPointer = pointerMatrix1.multiplyVector3(pointerVector1);
        } else if (index < this.cubeMaxLength * 2 / 3) {
          pointerMatrix2.rotate(angle * 3, 0, 1, 0);
          lastPointer = pointerMatrix2.multiplyVector3(pointerVector2);
        } else {
          pointerMatrix3.rotate(angle * 3, 1, 0, 0);
          lastPointer = pointerMatrix3.multiplyVector3(pointerVector3);
        }
        const lastModelMatrix = new Matrix4();
        lastModelMatrix.setTranslate(lastPointer.elements[0], lastPointer.elements[1], lastPointer.elements[2]);
        lastModelMatrix.scale(scale / 4, scale / 4, scale / 4);
        lastModelMatrix.rotate(rotate, 0, 1, 1);
        item.lastPointer = lastPointer.elements;
        item.lastModelMatrix = lastModelMatrix;
      },
    );
  }

  preDraw = () => {
    this.setView();
    this.setLight();
    this.setConfig();
  }

  setView = () => {
    const viewMatrix = new Matrix4();
    viewMatrix.setPerspective(30, this.drawWidth / this.drawHeight, 1, 600);
    viewMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
    this.viewMatrix = viewMatrix;
  }

  setLight = () => {
    this.gl.uniform3f(this.u_AmbientLight, 0.3, 0.3, 0.3);
    this.gl.uniform3f(this.u_LightColor, 1.0, 1.0, 1.0);
    this.gl.uniform3f(this.u_LightPosition, 10.0, 20.0, 5.0);
  }

  setConfig = () => {
    this.gl.clearColor(19 / 255, 38 / 255, 66 / 255, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.drawLast = Date.now();
    const mvpMatrix = new Matrix4();
    const normalMatrix = new Matrix4();
    this.mvpMatrix = mvpMatrix;
    this.normalMatrix = normalMatrix;
  }

  drawElements = () => {
    if (!this.loading) {
      this.step1();
    } else {
      this.step2();
    }
    window.requestAnimationFrame(this.drawElements);
  }

  step1 = () => {
    const now = Date.now();
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.viewMatrix.rotate(5 / 60, 0, 1, 0);
    this.cubeList.forEach(
      (item, index) => {
        const { modelMatrix, rotateSpeed } = item;
        const rotate = this.animate(rotateSpeed, now);
        modelMatrix.rotate(rotate, 0, 1, 1);
        this.cubeList[index].modelMatrix = modelMatrix;
        this.mvpMatrix.set(this.viewMatrix);
        this.mvpMatrix.multiply(modelMatrix);
        this.gl.uniformMatrix4fv(this.u_MvpMatrix, false, this.mvpMatrix.elements);
        this.normalMatrix.setInverseOf(modelMatrix);
        this.normalMatrix.transpose();
        this.gl.uniformMatrix4fv(this.u_NormalMatrix, false, this.normalMatrix.elements);
        this.gl.drawElements(this.gl.TRIANGLES, this.n, this.gl.UNSIGNED_BYTE, 0);
      },
    );
    this.drawLast = now;
  }

  step2 = () => {
    const now = Date.now();
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.viewMatrix.rotate(5 / 60, 0, 1, 0);
    this.cubeList.forEach(
      (item, index) => {
        const { lastModelMatrix, rotateSpeed } = item;
        const rotate = this.animate(rotateSpeed, now);
        lastModelMatrix.rotate(rotate, 0, 1, 1);
        this.cubeList[index].lastModelMatrix = lastModelMatrix;
        this.mvpMatrix.set(this.viewMatrix);
        this.mvpMatrix.multiply(lastModelMatrix);
        this.gl.uniformMatrix4fv(this.u_MvpMatrix, false, this.mvpMatrix.elements);
        this.normalMatrix.setInverseOf(lastModelMatrix);
        this.normalMatrix.transpose();
        this.gl.uniformMatrix4fv(this.u_NormalMatrix, false, this.normalMatrix.elements);
        this.gl.drawElements(this.gl.TRIANGLES, this.n, this.gl.UNSIGNED_BYTE, 0);
      },
    );
    this.drawLast = now;
  }

  animate = (speed, time) => {
    const dur = time - this.drawLast;
    const value = speed * dur / 1000.0;
    return value;
  }
}
