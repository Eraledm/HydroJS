function getR(v3){
  return Math.sqrt(v3["x"]*v3["x"]+v3["y"]*v3["y"]+v3["z"]*v3["z"]);
}
function getTheta(z, r){
    return Math.acos(z/r);
}
// function getPhi(y, x){
//     return Math.atan2(y, x);
// }
function getPhi(z, r){
    return Math.acos(z/r);
}
