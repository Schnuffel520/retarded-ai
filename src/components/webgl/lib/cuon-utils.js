/**
 * 初始化着色器
 * @param {*} gl gl对象
 * @param {*} vshader 顶点着色器
 * @param {*} fshader 片元着色器
 */
function initShaders(gl, vshader, fshader) {
  const program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('program 创建失败 ');
    return false;
  }
  gl.useProgram(program);
  gl.program = program;
  return true;
}

/**
 * 创建着色器
 * @param {*} gl gl对象
 * @param {*} vshader 顶点着色器
 * @param {*} fshader 片元着色器
 */
function createProgram(gl, vshader, fshader) {
  // 创建着色器对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  // 创建 program
  const program = gl.createProgram();
  if (!program) {
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    console.log('链接program失败：' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * 加载着色器
 * @param {*} gl gl 对象
 * @param {*} type 着色器类别
 * @param {*} source 着色器
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (shader === null) {
    console.log('不支持创建着色器');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    const error = gl.getShaderInfoLog(shader);
    console.log('编译着色器失败：' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export { initShaders, createProgram };
