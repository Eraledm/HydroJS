(function init(){
  W = document.getElementById('contenedor').offsetWidth;
  H = document.getElementById('contenedor').offsetHeight;
  coord_x_0 = W/2;
  coord_y_0 = H/2;
})();

// window.onresize = function () {
//   canvas.width = screen.width;
//   canvas.height = screen.height;
// };
window.onresize = function () {
  canvas.width = document.getElementById('contenedor').offsetWidth;
  canvas.height = document.getElementById('contenedor').offsetHeight;
  W = canvas.width;
  H = canvas.height;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();


function render() {
  ctx.clearRect(0, 0, W, H);
  hidrogen_update();
};

(function loop(){
    render();
    requestAnimFrame(loop);
})();
