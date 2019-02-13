var prev = null;

var particles=[];
var particles_orig=[];
var particles_p=[];
var size = 220;
var separation = 15;

var aug=0;
var eq = 100;
var rad = document.getElementsByName("ecuacion");

for(var i=0; i<size; i+=separation-1){
  for(var j=0; j<size; j+=separation-1){
    for(var k=0; k<size; k+=separation-1){
          particles.push({"x":(-size/2+i), "y":(-size/2+j), "z":(-size/2+k), "p":0});
          particles_orig.push({"x":(-size/2+i), "y":(-size/2+j), "z":(-size/2+k), "p":0});
    }
  }
}
messageLog("Creando...", "se han creado los puntos");
for(var i=0; i<particles.length; i++){
  particles_p.push(0);
  if(i%100==0){
    var t = document.createTextNode("[*] Particula " + (i + 1));
    var temp_element = document.createElement("p");
    temp_element.appendChild(t);
    document.getElementById("container_particles").appendChild(temp_element);
    temp_element = document.createElement("small");
    temp_element.id="pro_" + i;
    document.getElementById("container_particles").appendChild(temp_element);
    document.getElementById("container_particles").appendChild(document.createElement("br"));
    temp_element = document.createElement("small");
    temp_element.id="pos_" + i;
    document.getElementById("container_particles").appendChild(temp_element);
    document.getElementById("pos_" + i).innerHTML = " Posicion: ( " + (particles_orig[i]["x"]).toExponential(2) + " , " + (particles_orig[i]["y"]).toExponential(2) +", " + (particles_orig[i]["x"]).toExponential(2) + ")";
    document.getElementById("container_particles").appendChild(document.createElement("br"));
    document.getElementById("container_particles").appendChild(document.createElement("br"));
  }
}
messageLog("Limpiando...", "se han limpiado las probabilidades");
messageLog("Creando...", "se han creado los containers de datos");

getProbability(eq);
messageLog("ECUACIÓN...", "asignado por default a ψ100");

for(var i = 0; i < rad.length; i++) {
  rad[i].onclick = function() {
    if(this !== prev) {
      prev = this;
    }
    eq = parseInt(this.value);
    getProbability(eq);
    messageLog("ECUACIÓN...", "cambio de ecuación a ψ"+eq);
  };
}


function getProbability(eq){
  var pmax = 0;
  aug=1E-12;
  if(eq==210)             aug=.4E-11;
  if(eq==100||eq==200)    aug=1E-12;
  if(eq==211)             aug=1E9;
  if(eq==310)             aug=.3E10;
  if(eq==320)             aug=.3E10;
  if(eq==322)             aug=.3E10;
  for(var i=0; i<particles_orig.length; i++){
    v3 = {x:particles_orig[i]["x"]*aug, y:particles_orig[i]["y"]*aug, z:particles_orig[i]["z"]*aug}
    if(i==0)
      pmax = probability(v3, eq);
    if(probability(v3, eq)>pmax)
      pmax = probability(v3, eq);
  }
  messageLog("Prob. máxima...", "se ha encontrado la probabilidad máxima");
  for(var i=0; i<particles_orig.length; i++){
    v3 = {x:particles_orig[i]["x"]*aug, y:particles_orig[i]["y"]*aug, z:particles_orig[i]["z"]*aug}
    particles_p[i] = probability(v3, eq)/pmax ;
    if(i%100==0)
      document.getElementById("pro_" + i).innerHTML = " Probabilidad: %" + (particles_p[i]*pmax*100).toExponential(2);
  }
  messageLog("Probabilidades...", "se han asignado las probabilidades");
}

function probability(v3, eq){
    var r = getR(v3);
    var theta = getTheta(v3["z"], r);
    // var phi = getPhi(v3["y"], v3["x"]);
    var phi = getPhi(v3["z"], r);
    var a= 52.9E-12;
    var z=1;
    if(eq==100) return Math.pow(1/Math.sqrt(Math.PI)*Math.pow(z/a, 3/2)*(Math.exp(-z*r/a)), 2);
    if(eq==200) return Math.pow((1/4*Math.sqrt(2*Math.PI))*Math.pow(z/a, 3/2)*(2-z*r/a)*(1/Math.pow(Math.exp(1), z*r/2*a)), 2);
    if(eq==210) return (1/16*2*Math.PI)*Math.pow(z/a, 3)*Math.pow(z,2)*r*r/Math.pow(a,2)*(Math.exp(-z*r/a))*Math.cos(theta)*Math.cos(theta);
    if(eq==211) return Math.pow((1/8*Math.sqrt(Math.PI))*Math.pow(z/a, 3/2)*z*r/a*Math.exp(-z*r/2*a)*Math.cos(theta), 2);
    if(eq==300) return Math.pow( (1/81*Math.sqrt(3*Math.PI))*Math.pow(z/a, 3/2)*(27-18*z*r/a+2*z*z*r*r/(a*a))*Math.exp(-z*r/3*a) ,2)
    if(eq==310) return Math.pow( Math.sqrt(2)/81*Math.sqrt(Math.PI)*Math.pow(z/a, 3/2)*(6-z*r/a)*z*r/a*Math.exp(-z*r/3*a)*Math.cos(theta) ,2);
    if(eq==320) return Math.pow( (1/81*Math.sqrt(6*Math.PI))*Math.pow(z/a, 3/2)*z*z*r*r/(a*a)*Math.exp(-z*r/3*a)*(3*Math.cos(theta)*Math.cos(theta)-1) ,2);
    if(eq==322) return Math.pow( (4/81*Math.sqrt(30)*Math.pow(z*a), 3/2)*z*z*r*r/a*a*Math.exp(-z*r/3*a) * Math.sqrt(5/16*Math.PI)*(3*Math.cos(theta)*Math.cos(theta)-1) ,2);
}

function hidrogen_update(){
  view_update();
  rotateParticlesX(theta_x)
  rotateParticlesY(theta_y)
  rotateParticlesZ(theta_z)
  if(graphs){
  ctx.fillStyle = '#FEFEFE';
  ctx.font = "20px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("[ψ"+eq+"] Densidad de probabilidad del Hidrogeno", W/2, 100);
  ctx.font = "15px Georgia";
  ctx.fillText("Developed by: Eraledm", W/2, H-140);
  ctx.fillStyle = '#00897b';
  ctx.textAlign = "left";
  ctx.font = "15px Georgia";
  }
  for(var i =0; i<particles.length; i++){
    ctx.beginPath();
    ctx.fillStyle = "rgba(124,252,0, " + particles_p[i] + ")";
    ctx.arc(W/2+particles[i]["x"], H/2+particles[i]["y"], 2, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
  }
}

function rotateParticlesZ(theta){
  rotateTetraZ(theta);
  for(var i =0; i<particles.length; i++){
    particles[i] = rotationZ(theta, particles[i]);
  }
}

function rotateParticlesX(theta){
  rotateTetraX(theta);
  for(var i =0; i<particles.length; i++){
    particles[i] = rotationX(theta, particles[i]);
  }
}

function rotateParticlesY(theta){
  rotateTetraY(theta);

  for(var i =0; i<particles.length; i++){
    particles[i] = rotationY(theta, particles[i]);
  }
}

function messageLog(type, msg){
  var t = document.createTextNode("[*] " + type + " " + msg);
  var temp_element = document.createElement("p");
  temp_element.appendChild(t);
  var logs = document.getElementById("c_logs");
  if(logs.children.length>10)
    logs.removeChild(logs.lastChild);
  logs.prepend(temp_element);

}
document.onkeypress = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;

  if(charCode==119)  {
    theta_x -= (dTheta * dt);
    messageLog("Rotación..", "rotando X izquierda");
    document.getElementById("theta_x").innerHTML = theta_x;
  }
  if(charCode==115)  {
    theta_x += (dTheta * dt);
    messageLog("Rotación..", "rotando X derecha");
    document.getElementById("theta_x").innerHTML = theta_x;
  }
  if(charCode==97 )  {
    theta_y -= (dTheta * dt);
    messageLog("Rotación..", "rotando Y abajo");
    document.getElementById("theta_y").innerHTML = theta_y;
  }
  if(charCode==100)  {
    theta_y += (dTheta * dt);
    messageLog("Rotación..", "rotando Y arriba");
    document.getElementById("theta_y").innerHTML = theta_y;
  }
  if(charCode==113)  {
    theta_z += (dTheta * dt);
    messageLog("Rotación..", "rotando Z izquierda");
    document.getElementById("theta_z").innerHTML = theta_z;
  }
  if(charCode==101)  {
    messageLog("Rotación..", "rotando Z derecha");
    theta_z -= (dTheta * dt);
    document.getElementById("theta_z").innerHTML = theta_z;
  }
  if(charCode==120)  {
    messageLog("Rotación..", "reiniciando");
    restart();
  }
};
