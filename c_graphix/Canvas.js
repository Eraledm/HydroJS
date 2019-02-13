var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = 0;
var H = 0;
var coord_x_0 = 0;
var coord_y_0 = 0;
// canvas.width = screen.availWidth;
// canvas.height = screen.availHeight;
canvas.width = document.getElementById('contenedor').offsetWidth;
canvas.height = document.getElementById('contenedor').offsetHeight;

function line(x1, y1, x2, y2, color){
    this.ctx.beginPath();
    ctx.strokeStyle = color;
    this.ctx.moveTo(x1 + coord_x_0, y1 + coord_y_0);
    this.ctx.lineTo(x2 + coord_x_0, y2 + coord_y_0);
    this.ctx.stroke();
    this.ctx.closePath();
}
