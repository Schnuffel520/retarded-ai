// 顶点着色器
// hsl转换函数，转自网络资源
export const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  // color测试
  'float hue2rgb(float p, float q, float t) {\n' +
  ' float swap = t;\n' +
  ' if(swap < 0.0) {\n' +
  '   swap = swap + 1.0;\n' +
  ' }\n' +
  ' if(swap > 1.0) {\n' +
  '   swap = swap - 1.0;\n' +
  ' }\n' +
  ' if(swap < 1.0 / 6.0) {\n' +
  '   return p + (q - p) * 6.0 * swap;\n' +
  ' }\n' +
  ' if(swap < 1.0 / 2.0) {\n' +
  '   return q;\n' +
  ' }\n' +
  ' if(swap < 2.0 / 3.0) {\n' +
  '   return p + (q - p) * 6.0 * (2.0 / 3.0 - swap);\n' +
  ' }\n' +
  ' return p;\n' +
  '}\n' +
  // hsl转为rgb
  'vec3 hslToRgb(float h, float s, float l) {\n' +
  ' float r;\n' +
  ' float g;\n' +
  ' float b;\n' +
  ' if(s == 0.0) {\n' +
  '   r = l;\n' +
  '   g = l;\n' +
  '   b = l;\n' +
  ' } else {\n' +
  '   float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;\n' +
  '   float p = 2.0 * l - q;\n' +
  '   r = hue2rgb(p, q, h + 1.0 / 3.0);\n' +
  '   g = hue2rgb(p, q, h);\n' +
  '   b = hue2rgb(p, q, h - 1.0 / 3.0);\n' +
  ' }\n' +
  ' return vec3(r, g, b);\n' +
  '}\n' +
  'void main() {\n' +
  ' gl_Position = u_MvpMatrix * a_Position;\n' +
  ' gl_PointSize = 5.0;\n' +
  // 声明空间中三个点：轴线上的一点、中心点、当前点
  ' vec3 start_Position = vec3(1.0, 0.0, 0.0);\n' +
  ' vec3 center_Position = vec3(0.0, 0.0, 0.0);\n' +
  ' vec3 end_Position = vec3(a_Position);\n' +
  // 轴线上的点与中心点构成向量，并求出长度
  ' float l_Start = distance(start_Position, center_Position);\n' +
  // 当前点与中心点构成向量，并求出长度
  ' float l_End = distance(end_Position, center_Position);\n' +
  // 利用向量点积，求出cos：a·b = |a|·|b|·cos
  ' float _cos = dot(start_Position, end_Position) / l_Start / l_End;\n' +
  // 利用反余弦函数，求出角度值
  ' float _angle = degrees(acos(_cos));\n' +
  // 如果点位于第三、第四象限，需要反转角度：360 - angle。
  ' if(a_Position.y < 0.0) {\n' +
  '   _angle = 360.0 - _angle;\n' +
  ' }\n' +
  ' v_Color = vec4(hslToRgb((_angle / 360.0), 0.8, 0.5), 1.0);\n' +
  '}\n';

// 片元着色器
export const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  ' gl_FragColor = v_Color;\n' +
  '}\n';
