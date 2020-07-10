/**
 * 求点集算法
 * @param {number} xaxis x轴的点集密度
 * @param {number} zaxis z轴的点密集度
 * @param {number} disX x轴的跨度
 * @param {number} disZ z轴的跨度
 * @param {number} startX x轴向起点
 * @param {number} startZ z轴向起点
 */
function xyzValue(xaxis, zaxis, disX, disZ, startX, startZ) {
  // 轴跨度与世界坐标系设定相关，如果采用了透视系统，那么x轴的跨度就不是固定为2了。
  // 轴的跨度等于透视盒子的纵深。
  // 计算点集间隔。
  const evaXais = disX / xaxis;
  const evaZaxis = disZ / zaxis;
  // x轴向数值
  const xList = [];
  for (let i = 0; i < xaxis; i++) {
    const x = startX + i * evaXais;
    xList.push(x);
  }
  // z轴向数值
  const zList = [];
  for (let i = 0; i < zaxis; i++) {
    const z = startZ + i * evaZaxis;
    zList.push(z);
  }
  // 粒子点集
  const xyzList = [];
  zList.forEach(
    (zitem) => {
      xList.forEach(
        (xitem) => {
          xyzList.push(xitem, 0, zitem);
        },
      );
    },
  );
  return new Float32Array(xyzList);
}

function indexValue(length) {
  const index = [];
  for (let i = 0; i < length; i++) {
    index.push(i);
  }
  return new Uint16Array(index);
}

export const vertices = xyzValue(80, 80, 30, 30, -15, -15);

export const indices = indexValue(6400);
