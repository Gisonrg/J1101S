// sidequest 5.1 task 1

var test_curve = function(t){
    return make_point(t, 0.5 + (Math.sin(4 * (Math.PI * t)) / 2));
};

function stack(curve1, curve2) {
	function scale_y(frac) {
		return function(curve) {
			return function(t) {
				var ct = curve(t);
				return make_point(x_of(ct), frac * y_of(ct));
			};
	    };
	}
	return connect_rigidly((translate(0, 0.5)) ((scale_y(0.5)) (curve1)), ((scale_y(0.5)) (curve2)));
}