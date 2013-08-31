// File: mission_4_1.js

// (a)

// unit_line_at : (JS-Num) -> Curve

// (b)

function vertical_line(point, length) {
    // your code here
	return function(t) {
		return make_point(x_of(point), y_of(point) + (t * length));
	};
}

// (c)

// vertical_line : (Point, JS-Num) -> Curve

// (d)

// your code here
(draw_connected(200)) (vertical_line(make_point(0.5, 0.5), 0.5));
// mission 4 task 2

// your answer here
/*
I will explain my findings step by step.

(draw_connected(200))(unit_circle);
(draw_connected(200))(alternative_unit_circle);

No much difference when using the draw_connected function.

(draw_points_on(200))(unit_circle);
(draw_points_on(200))(alternative_unit_circle);

We can clearly see that points are evenly distrubited on the curve when using unit_circle. 
However, when showing alternative_unit_circle, we can obviously see that the points are more dense
at the beginning of the curve. The space between two adjacent points is becoming larger and larger.

(draw_points_squeezed_to_window(200))(unit_circle);
(draw_points_squeezed_to_window(200))(alternative_unit_circle);

Till now the difference is very clear. For unit_circle, the space between two adjacent points 
is always the same, and they are evenly distributed on the curve.
While for alternative_unit_circle, the space between two adjacent points is increasing, and they are not 
evenly distributed on the curve.
Although the difference exists, if we connect all the points, we will get almost the same picture in general
since they all lies on the same curve. So we need to see the function itself.

Here is the code for unit_circle:
function unit_circle(t){
    return make_point(Math.sin(2 * Math.PI * t),
                      Math.cos(2 * Math.PI * t));
}
Since the t is increasing at a constant rate from 0 to 1, so the points start from (0, 1) and go clockwise
at a constant space as well. This explains why they are evenly distributed.
	
Here is the code for alternative_unit_circle:
function alternative_unit_circle(t){
    return make_point(Math.sin(2 * Math.PI * square(t)),
                      Math.cos(2 * Math.PI * square(t)));
}

Comparing to the unit_circle, the t becomes square(t) now, so this can explain why there are more points 
at the start of the curve. At first, t is small, so square(t) results to a smaller value so that the position
is nearer to the point (0, 1).Hence points are more dense at the beginning.
Also, when x is within [0, 1], the function square(x) will still return an x within [0, 1]; 
this explains why they still lies in a circle.

*/