// Task 1

/*
1) your answer here.
Yes, since the only change is "ct" is replaced by "curve(t)", while the definition of ct is "var ct = curve(t)", so actually
ct and curve(T) are equivalent. Therefore, these two functions will give the same output.
2) your explanation here.
The pat_rotate is slower because it will evaluate curve(t) twice, so in the recursive process of the gosper_curve,  
gosper_curve(x) will be approximately 2 times slower than the gosper_curve(x-1). So in the recursive process, each call will in two times slower than
the previous, hence the run time is exponential in x. 
But for rotate_around_origin, the curve(t) will only be evaluated once, so in this recursive process, the run time is linearly.
*/

(draw_connected_full_view(1000))(connect_ends(unit_line, unit_circle));
// Task 2
function dragonize(n, curve) {
	if (n === 0) {
		return curve;
	} else {
		var c = dragonize(n - 1, curve);
		return put_in_standard_position(connect_ends((rotate_around_origin(- Math.PI / 2))(revert(c)), c));
	}
}
// Task 2 Test
//(draw_connected_squeezed_to_window(1000))(dragonize(200, unit_line));

[5, [[6, [[3, []], []]], []]]

[[3, [4, []]], [3, []]]

head(head(head(head(tail(tail(head(head(head(head(tail(a)))))))))));
head(head(head(tail(tail(head(head(head(head(tail(a))))))))));


[7, [[[[6, [5, [[[4, []], []], [3, []]]]], [2, []]], []], [1, []]]]
head(head(head(tail(tail(head(head(head(tail(a))))))))); 