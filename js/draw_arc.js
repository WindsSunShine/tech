define(function(require, exports, module) {
	var $ = require('jquery');
	exports.draw_arc=function(score){
		var canvas=document.getElementById('canvas-score-circle'),
	    	ctx = canvas.getContext('2d'),
	    	c_width=$('.comprehensive-score-circle').width(),
	    	w_width=document.documentElement.clientWidth,
	    	arc_line_width=4*w_width/75,
	    	arc_radius=c_width/2-arc_line_width;
	    canvas.width=c_width;
	    canvas.height=c_width;
	    ctx.lineWidth = arc_line_width;
	    ctx.beginPath();
	    ctx.arc(c_width/2,c_width/2,arc_radius,0,2*Math.PI,0);
	    ctx.strokeStyle = '#e1e1e1';
	    ctx.stroke();
	    ctx.closePath();

	    ctx.beginPath();
	    ctx.arc(c_width/2,c_width/2,arc_radius,0,2*Math.PI*score/10,0);
	    ctx.strokeStyle = '#00c176';
	    
	    ctx.stroke();
	    ctx.closePath();
	}
});