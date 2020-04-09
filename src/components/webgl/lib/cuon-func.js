/**
 * 计算各组点的数据
 * @param {Number} num 扇叶数目
 * @param {Number} r 内半径
 * @param {Number} R 外半径
 * @returns {Object} 顶点和索引
 */
export function createVertexByGroupPoint(num, r, R) {
  const point = [];
  const index = [];
  const factor = 2 * Math.PI / num;
  for (let i = 0; i < num; i++) {
    point.push(R * Math.cos((i + 1) * factor), R * Math.sin((i + 1) * factor), 0, R * Math.cos((i) * factor), R * Math.sin((i) * factor), 0, r * Math.cos((i) * factor), r * Math.sin((i) * factor), 0, r * Math.cos((i + 1) * factor), r * Math.sin((i + 1) * factor), 0);
    index.push(i * 4 + 0);
    index.push(i * 4 + 1);
    index.push(i * 4 + 2);
    index.push(i * 4 + 0);
    index.push(i * 4 + 2);
    index.push(i * 4 + 3);
  }
  return {
    vertex: point,
    index: index,
  };
}
