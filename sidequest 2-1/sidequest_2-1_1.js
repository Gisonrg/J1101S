// idequest 2.1 task 1
 
function beside_frac(frac, pic_a, pic_b)
{
	return quarter_turn_left(stack_frac(frac, quarter_turn_right(pic_a), quarter_turn_right(pic_b)));
}
 
function beside_n(n, pic) {
	return quarter_turn_left(stackn(n, quarter_turn_right(pic)));
}
 
function middle_part(n, pic) {
	return beside_frac(1 / n, stackn(n - 2, pic), beside_frac((n - 2) / (n - 1), pic, stackn(n - 2, pic)));
}
 
function persian(rune, count){
    // your answer here
    return stack_frac(1 / count, beside_n(count, rune), stack_frac((count - 2) / (count - 1), middle_part(count, rune), beside_n(count, rune)));
}
 
// Test
//show(persian(make_cross(rcross_bb), 5));
show(persian(nova_bb,9));