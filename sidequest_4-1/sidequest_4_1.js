// File: sidequest_4_1.js
/*
function J (t) {
    // your code here
	function vertical_line(point, length) {
    // your code here
	return function(t) {
		return make_point(x_of(point), y_of(point) + (t - 0.35) * 1 / 0.15 * length);
		};
	}
	
		function horiz_line(point, length) {
		// your code here
		return function(t) {
			return make_point(x_of(point) + ((t - 0.8) * 5 * length), y_of(point));
			};
		}
	
	function half_circle(t){
		return make_point(0.35 + 0.15 * Math.cos(Math.PI + (Math.PI * (t - 0.2) * 1 / 0.15)), 0.35 + 0.15 * Math.sin(Math.PI + (Math.PI * (t - 0.2) * 1 / 0.15)));
	}
	
	if (t >= 0.2 && t <= 0.35) {
			return make_point(0.35 + 0.15 * Math.cos(Math.PI + (Math.PI * (t - 0.2) * 1 / 0.15)), 0.35 + 0.15 * Math.sin(Math.PI + (Math.PI * (t - 0.2) * 1 / 0.15)));
		} else if (t >= 0.35 && t <= 0.8) {
			return make_point(0.5, 0.35 + (t - 0.35) * 1 / 0.15 * 0.45);
		} else {
			return make_point(0.2 + ((t - 0.8) * 5 * 0.6), 0.8);
		} 
	
}

(draw_points_on(200))(horiz_line(meka_point(0.2, 0.8), 0.6));
*/
function J (t) {
	if (t >= 0.2 && t <= 0.35) {
			return make_point(0.35 + 0.15 * Math.cos(Math.PI + (Math.PI * (t - 0.2) * 1 / 0.15)), 0.35 + 0.15 * Math.sin(Math.PI + (Math.PI * (t - 0.2) * 1 / 0.15)));
		} else if (t >= 0.35 && t <= 0.8) {
			return make_point(0.5, 0.35 + (t - 0.35) * 1 / 0.45 * 0.45);
		} else if (t >= 0.8) {
			return make_point(0.2 + ((t - 0.8) * 5 * 0.6), 0.8);
		} else {
			return make_point(0.2, 0.35);
		}
}

(draw_connected(1000))(J);

