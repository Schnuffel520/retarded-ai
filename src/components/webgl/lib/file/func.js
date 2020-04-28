export function readOBJFile(fileName, gl, model, scale, reverse) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status !== 404) {
      console.log(request.responseText);
      // onReadOBJFile(request.responseText, fileName, gl, model, scale, reverse);
    }
  };
  request.open('GET', fileName, true);
  request.send();
}
