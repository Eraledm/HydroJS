var tetra = {
  0:{x:-200 ,    y:0,     z:0},
  1:{x:200  ,    y:0,     z:0},
  2:{x:0   , y:-200,     z:0},
  3:{x:0   ,  y:200,     z:0},
  4:{x:0   ,    y:0,   z:200},
  5:{x:0   ,    y:0,  z:-200}
};
var dTheta = 1/80;
var theta_x = 0;
var theta_y = 0;
var theta_z = 0;
var dt = Math.PI;

var graphs=true;

function restart(){
  theta_x=0;
  theta_y=0;
  theta_z=0;
}



function rotateTetraZ(theta_z){

  for(i=0; i<Object.keys(tetra).length;i++){
    tetra[i] = rotationZ(theta_z, tetra[i])
  }
}

function rotateTetraX(theta_x){

  for(i=0; i<Object.keys(tetra).length;i++){
    tetra[i] = rotationX(theta_x, tetra[i])
  }
}

function rotateTetraY(theta_y){

  for(i=0; i<Object.keys(tetra).length;i++){
    tetra[i] = rotationY(theta_y, tetra[i])
  }
}

var color=['#f44242', '', '#44db3f', '', '#5699f7', '']
function printTetra(){
  for(i=0; i<Object.keys(tetra).length;i+=2){
    // line(tetra[i]["x"], tetra[i]["y"], tetra[i+1]["x"], tetra[i+1]["y"], '#FEFEFE' );
    line(tetra[i]["x"], tetra[i]["y"], tetra[i+1]["x"], tetra[i+1]["y"],  color[i]);
  }
}

function printLogTetra(){
  this.ctx.beginPath();
  ctx.fillStyle = '#00897b';
  for(var i =0; i<6;i++)
    ctx.fillText("tetra[" + i + "]: " + JSON.stringify(tetra[i]), W/2-250, 120 + i*20);
  this.ctx.closePath();
}

function view_update(){
  if(graphs) printTetra();
  // printLogTetra();
}
