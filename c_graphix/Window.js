document.onkeypress = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  // alert(charCode);
  if(charCode==119) rotateTetraY(LEFT)
  if(charCode==115) rotateTetraY(RIGHT)
  if(charCode==97 ) rotateTetraX(LEFT)
  if(charCode==100) rotateTetraX(RIGHT)
  if(charCode==113) rotateTetraZ(LEFT)
  if(charCode==101) rotateTetraZ(RIGHT)
};
