import { loadCanvas2dConfig, isElement } from './cuon-func';

export default class Canvas2d {
  constructor(dom, options, config) {
    this.CANVAS2D_CONTEXT_CONFIG = loadCanvas2dConfig(config);
    this.dom = undefined;
    this.canvas = undefined;
    this.drawWidth = 0;
    this.drawHeight = 0;
    this.context = undefined;
    this.options = { ...options };
  }

  create = (dom) => {
    const flag = isElement(dom);
    if (flag) {
      this.dom = dom;
      try {
        this.createCanvas();
        this.linkCanvas();
        this.getCanvas2dContext();
        this.render();
      } catch (error) {
        throw new Error('Faile to init Canvas2dRenderingContext ' + error);
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

  resizeCanvas = () => {
    // 获取dom的基本信息
    const boundRect = this.dom.getBoundingClientRect();
    // console.log(boundRect);
    this.canvas.width = boundRect.width;
    this.canvas.height = boundRect.height;
  }

  getCanvas2dContext = () => {
    const context = this.canvas.getContext('2d', { ...this.CANVAS2D_CONTEXT_CONFIG });
    if (!context) {
      throw new Error('Failed to get the Canvas2dRenderingContext');
    } else {
      this.context = context;
    }
  }

  render = () => { }
}
