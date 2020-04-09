// hsl转rgba--着色器程序段
export const hslToRgba =
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
  'vec3 hslToRgba(float h, float s, float l) {\n' +
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
  '}\n';
