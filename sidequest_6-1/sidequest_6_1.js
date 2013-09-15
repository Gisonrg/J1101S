// Task 1
	        
// your code here
function show_connected_koch(level, number_of_points) {
	function koch(n, curve) {
		if (n === 0) {
			return curve;
		} else {
			return put_in_standard_position(connect_ends(connect_ends(
			           (koch(n - 1, curve)), (rotate_around_origin(Math.PI / 3))(koch(n - 1, curve))),
			               connect_ends((rotate_around_origin(- Math.PI / 3))(koch(n - 1, curve)), 
						       (koch(n - 1, curve)))));
		}
	}
	return (draw_connected(number_of_points))(koch(level, unit_line));
}
// Test
show_connected_koch(5, 4000);

// Task 2
	        
// your code here
function snowflake() {
	function koch(n, curve) {
		if (n === 0) {
			return curve;
		} else {
			return put_in_standard_position(connect_ends(connect_ends(
			           (koch(n - 1, curve)), (rotate_around_origin(Math.PI / 3))(koch(n - 1, curve))),
			               connect_ends((rotate_around_origin(- Math.PI / 3))(koch(n - 1, curve)), 
						       (koch(n - 1, curve)))));
		}
	}
	var snow = koch(5, unit_line);
	return connect_ends(connect_ends((snow), (rotate_around_origin(- Math.PI * 2 / 3))(snow)), 
		       (rotate_around_origin(Math.PI * 2 / 3))(snow));
}
// Test
(draw_connected_full_view_proportional(10000))(snowflake());
