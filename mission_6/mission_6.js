// Task 1

function arc(t) {
    return make_point(Math.sin(Math.PI * t),
                      Math.cos(Math.PI * t));
}

function show_points_gosper(level, number_of_points, initial_curve) {
    // your solution here!
	function gosper_curve(level) {
		return (repeated(gosperize, level)) (initial_curve);
	}	
	return (draw_points_on(number_of_points)) ((squeeze_rectangular_portion(-0.5, 1.5, -0.5, 1.5)) (gosper_curve(level)));
}

// testing
//show_points_gosper(7, 1000, arc);
//show_points_gosper(5, 500, arc);

// Task 2

function your_param_gosper(level, angle_at) {
    if(level === 0) {
        return unit_line;
    } else {
        return (your_param_gosperize(angle_at(level))) (your_param_gosper(level - 1, angle_at));
    }
}

function your_param_gosperize(theta) {
    return function(curve) {
               return put_in_standard_position(connect_ends((rotate_around_origin(theta)) (curve),
			       (rotate_around_origin(- theta)) (curve)));
           };
}

// testing
//(draw_connected(200))(your_param_gosper(10, function(n){ return Math.PI / (n + 2); }));
//(draw_connected(200))(your_param_gosper(5, function(n){ return Math.PI / 4 / Math.pow(1.3, n); }));
// Task 3

//sample tests:
//(timed((timed(gosper_curve))(8000)))(0.1);
//(timed((timed(param_gosper))(8000, function(level){ return Math.PI/4; })))(0.1);
//(timed((timed(your_param_gosper))(8000, function(level){ return Math.PI/4; })))(0.1);

/*
I let the level to be 8000.
All the time are in milliseconds.
(Name  \   Time)	1	2	3	4	5	6	Average
gosper_curve:	   476 446 449 430 472 450	  454
param_gosper:	   125 109 154 114 117 164	  131

When I try level 8000 for your_param_gosper, the function cannot return any number. So I have to try at a lower level, namely, 1000. The result
is much higher than the previous one even if it is at a lower level. 
Test:(timed((timed(your_param_gosper))(1000, function(level){ return Math.PI/4; })))(0.1);

(Name  \   Time)	 1	  2	   3	4	 5	  6	 Average
your_param_gosper: 1266 1235 1289 1161 1111 1116  1196

Conclusion:
Considering the speed, param_gosper is the fastest, gosper_curve is slower, and your_param_gosper is the slowest.
I think param_gosper is the fastest because it uses iterative process(tail recursion), but gosper_curve uses the function 'repeated'. I checked the code for 'repeated',
it is a recursive process. In general, iterative process is much faster than the recursive process, so this explains why param_gosper is the fastest.
In my opinion, your_param_gosper is the slowest because there are repeated and nested calls to the function "put_in_standard_position" and "rotate_around_origin", and these 
functions actually works in a way like so called deferred operations, which will consume a lot of time and space. In addition, if the level is too big, I think the recursion is
too deep and exceed the maximum depth of the stack so the function cannot work well at all. 
Please correct me if I am wrong.
*/



