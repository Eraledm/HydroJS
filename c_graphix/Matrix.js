const LEFT = -1;
const RIGHT = 1;

function rotationX(theta, v3){
  var cosTheta = Math.cos(theta);
  var sinTheta = Math.sin(theta);
  return {
    x: v3["x"],
    y: v3["y"]*cosTheta-v3["z"]*sinTheta,
    z: v3["y"]*sinTheta+v3["z"]*cosTheta
  };
}

function rotationY(theta, v3){
  var cosTheta = Math.cos(theta);
  var sinTheta = Math.sin(theta);
  return {
    x: v3["x"]*cosTheta+v3["z"]*sinTheta,
    y: v3["y"],
    z: -v3["x"]*sinTheta+v3["z"]*cosTheta
  };
}

function rotationZ(theta, v3){
  var cosTheta = Math.cos(theta);
  var sinTheta = Math.sin(theta);
  return {
    x: v3["x"]*cosTheta-v3["y"]*sinTheta,
    y: v3["x"]*sinTheta+v3["y"]*cosTheta,
    z: v3["z"]
  };
}
