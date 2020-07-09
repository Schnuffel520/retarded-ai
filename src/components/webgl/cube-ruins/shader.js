export const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec3 v_Normal;\n' +
  'void main() {\n' +
  ' gl_Position = u_MvpMatrix * a_Position;\n' +
  ' v_Position = vec3(u_MvpMatrix * a_Position);\n' +
  ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  ' v_Color = vec4(0.0509,0.14509,0.274509,1.0);\n' +
  '}\n';
export const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec3 u_LightColor;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  ' vec3 normal = normalize(v_Normal);\n' +
  ' vec3 lightDiretion = normalize(u_LightPosition - v_Position);\n' +
  ' float nDotL = max(dot(lightDiretion, normal), 0.0);\n' +
  ' vec3 diffuse = u_LightColor * vec3(v_Color) * nDotL;\n' +
  ' vec3 ambient = u_AmbientLight * vec3(v_Color);\n' +
  ' gl_FragColor = vec4(ambient + diffuse, v_Color.a);\n' +
  '}\n';
