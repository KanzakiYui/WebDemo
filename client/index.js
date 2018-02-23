var rotateX = 0;
$(function(){
	setInterval(function(){
		rotateX = (rotateX+9)%360;
		$("#topBar embed").css("transform", 'rotateZ('+rotateX+'deg)');
	},50);
})