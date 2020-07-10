import Canvas2d from '../lib/canvas2d';

export default class ArchBridge extends Canvas2d {
  constructor(dom, options, config) {
    super(dom, options, config);
    this.loading = false;
    this.derR = 30;
    this.R = undefined;
    this.disX = undefined;
    this.sita = undefined;
    this.create(dom);
  }

  render = () => {
    this.loading = true;
    this.setConfig();
    this.drawGrid();
    this.drawLeftLine();
    this.drawTopLine();
    this.drawBottomLine();
    this.drawSolidLine();
    this.drawRightLine();
  }

  setConfig = () => {
    this.R = 360 + this.derR;
    this.sita = Math.asin(360 / this.R);
    this.disX = Math.cos(this.sita) * this.R;
  }

  drawGrid = () => {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(202, 0);
    this.context.lineTo(593 - this.disX, 0);
    this.context.arc(593, 360, this.R, -this.sita, this.sita, true);
    this.context.lineTo(202, 720);
    this.context.lineTo(6, 600);
    this.context.lineTo(6, 120);
    this.context.lineTo(202, 0);
    this.context.closePath();
    const linearGradient = this.context.createLinearGradient(0, 0, 593, 0);
    linearGradient.addColorStop(0, 'rgba(255,255,255,0.2)');
    linearGradient.addColorStop(1, 'rgba(255,255,255,0)');
    this.context.fillStyle = linearGradient;
    this.context.fill();
    this.context.restore();
  }

  drawLeftLine = () => {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(6, 120);
    this.context.lineTo(6, 600);
    this.context.closePath();
    const linearGradient = this.context.createLinearGradient(6, 120, 6, 600);
    linearGradient.addColorStop(0, 'rgba(255,255,255,0.0)');
    linearGradient.addColorStop(0.5, 'rgba(255,255,255,1)');
    linearGradient.addColorStop(1, 'rgba(255,255,255,0.0)');
    this.context.strokeStyle = linearGradient;
    this.context.stroke();
    this.context.restore();
  }

  drawTopLine = () => {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(6, 120);
    this.context.lineTo(202, 0);
    const linearGradient = this.context.createLinearGradient(6, 120, 202, 0);
    linearGradient.addColorStop(0, 'rgba(255,255,255,0.1)');
    linearGradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    linearGradient.addColorStop(1, 'rgba(255,255,255,0.1)');
    this.context.strokeStyle = linearGradient;
    this.context.stroke();
    this.context.restore();
  }

  drawBottomLine = () => {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(6, 600);
    this.context.lineTo(202, 720);
    const linearGradient = this.context.createLinearGradient(6, 600, 202, 720);
    linearGradient.addColorStop(0, 'rgba(255,255,255,0.1)');
    linearGradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    linearGradient.addColorStop(1, 'rgba(255,255,255,0.1)');
    this.context.strokeStyle = linearGradient;
    this.context.stroke();
    this.context.restore();
  }

  drawSolidLine = () => {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(6, 150);
    this.context.lineTo(6, 120);
    this.context.lineTo(30, 105);
    this.context.moveTo(6, 570);
    this.context.lineTo(6, 600);
    this.context.lineTo(30, 615);
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#ffffff';
    this.context.lineWidth = 5;
    this.context.stroke();
    this.context.restore();
  }

  drawRightLine = () => {
    this.context.save();
    this.context.beginPath();
    this.context.arc(593, 360, this.R, 0.75 * Math.PI, -0.75 * Math.PI, false);
    this.context.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(593, 360, this.R - 10, 0.75 * Math.PI, -0.75 * Math.PI, false);
    this.context.lineWidth = 7;
    this.context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.context.stroke();
    this.context.restore();
  }
}
