// File: mission_5_1.js

function reflect_through_y_axis(curve) {
	return function(t) {
		var ct = curve(t);
		return make_point(- x_of(ct), y_of(ct));
	};
}
(draw_points_squeezed_to_window(200)) (alternative_unit_circle);
(draw_points_squeezed_to_window(200)) (reflect_through_y_axis(alternative_unit_circle));