// File: mission_5_2.js

function connect_ends (curve1, curve2) {
    // your solution here
	var x1 = x_of(curve1(1));
	var y1 = y_of(curve1(1));
	var x2 = x_of(curve2(0));
	var y2 = y_of(curve2(0));
	return connect_rigidly(curve1, (translate(x1 - x2, y1 - y2))(curve2));
}

function vertical_line(point, length) {
    // your code here
	return function(t) {
		return make_point(x_of(point), y_of(point) + (t * length));
	};
}

(draw_points_squeezed_to_window(200))(connect_ends(alternative_unit_circle, vertical_line(make_point(0.5,0.25), -0.3)));