// File: sidequest_5_1_2.js

var test_curve = function(t) {
    return make_point(t, 0.5 + (Math.sin(4 * (Math.PI * t)) / 2));
}

function stack_frac(frac, curve1, curve2) {
	function scale_y(frac) {
		return function(curve) {
			return function(t) {
				var ct = curve(t);
				return make_point(x_of(ct), frac * y_of(ct));
			};
		};
	}
	return connect_rigidly((translate(0, 1 - frac)) ((scale_y(frac)) (curve1)), ((scale_y(1 - frac)) (curve2)));
}

(draw_points_on(4000))(stack frac(1/5, test_curve, test_curve));
(draw_points_on(6000))(stack_frac(1/5, test_curve, stack_frac(3/4, test_curve, test_curve)));