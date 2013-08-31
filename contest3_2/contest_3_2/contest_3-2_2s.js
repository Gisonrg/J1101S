// File: contest_3-2_1.js
// Second entry
function jiangsheng_2d_contest_1() {
//common function:
	function beside_frac(frac, pic_a, pic_b) {
		return quarter_turn_left(stack_frac(frac, quarter_turn_right(pic_a), quarter_turn_right(pic_b)));
	}
 
	function besiden(n, pic) {
		return quarter_turn_left(stackn(n, quarter_turn_right(pic)));
	}

	function blankn(a, b) {
		return stackn(a, besiden(b, blank_bb));
	}

	function blackn(a, b) {
		return stackn(a, besiden(b, black_bb));
	}
	
	function draw_2(frac, hight, all) {
		return beside_frac(frac / all, blankn(hight, frac), blackn(hight, all - frac));
	}
	
	function draw_3(frac_1, frac_2, hight, all) {
		return beside_frac(frac_1 / all, blackn(hight, frac_1), beside_frac(frac_2 / (all - frac_1), blankn(hight, frac_2), blackn(hight, all - frac_1 - frac_2)));
	}

	function draw_4(frac_1, frac_2, frac_3, hight, all) {
		return beside_frac(frac_1 / all, blankn(hight, frac_1), beside_frac(frac_2 / (all - frac_1), blackn(hight, frac_2), 
			       beside_frac(frac_3 / (all - frac_1 - frac_2), blankn(hight, frac_3), blackn(hight, all - frac_1 - frac_2 - frac_3))));
	}	
	
	function blank_line() {
		return besiden(25, blank_bb);
	}
	
//ADIDAS part:
function adidas() {
	function print_a() {
		return stack_frac(2 / 10, blankn(2, 7), stack_frac(1 / 8, draw_2(5, 1, 7), stack_frac(1 / 7, draw_2(2, 1, 7), stack_frac(1 / 6, blackn(1, 7), stack_frac(1 / 5, draw_3(2, 3, 1, 7),
			stack_frac(1 / 4, draw_3(1, 4, 1, 7), stack_frac(1 / 3, draw_3(2, 3, 1, 7), stack_frac(1 / 2, blackn(1, 7), draw_2(2, 1, 7)))))))));
	}

	function print_d() {
		return stack_frac(2 / 10, stack(draw_2(5, 1, 7), draw_2(5, 1, 7)), stack_frac(1 / 8, draw_2(5, 1, 7), stack_frac(1 / 7, draw_2(2, 1, 7), stack_frac(1 / 6, blackn(1, 7), 
		       stack_frac(1 / 5, draw_3(2, 3, 1, 7), stack_frac(1 / 4, draw_3(1, 4, 1, 7), stack_frac(1 / 3, draw_3(2, 3, 1, 7), stack_frac(1 / 2, blackn(1, 7), draw_2(2, 1, 7)))))))));
	}

	function print_i() {
		return stack_frac(2 / 10, blackn(2, 2), stack_frac(1 / 8, blankn(1, 2), blackn(2, 8)));
	}

	function print_s() {
		function d1() {
		return beside_frac(1 / 6, blackn(1, 1), beside_frac(4 / 5, blackn(1, 4), blankn(1, 1)));
	}
	
		function d3() {
			return beside_frac(3 / 6, blackn(1, 3), blankn(1, 3));
		}
		return stack_frac(3 / 10, blankn(3, 6), stack_frac(1 / 7, d1(), stack_frac(1 / 6, draw_3(2, 2, 1, 6), stack_frac(1 / 5, d3(), stack_frac(1 / 4, d1(), 
		       stack_frac(1 / 3, draw_2(3, 1, 6), stack_frac(1 / 2, draw_3(2, 2, 1, 6), draw_2(1, 1, 6))))))));
	}	
	
	return beside_frac(4 / 50, blankn(10, 4), beside_frac(7 / 46, print_a(), beside_frac(1 / 39, blankn(10, 1), beside_frac(7 / 38, print_d(),
		       beside_frac(1 / 31, blankn(10, 1), beside_frac(2 / 30, print_i(), beside_frac(1 / 28, blankn(10, 1), beside_frac(7 / 27, print_d(),
			       beside_frac(1 / 20, blankn(10, 1), beside_frac(7 / 19, print_a(), beside_frac(1 / 12, blankn(10, 1), beside_frac(6 / 11, print_s(), blankn(10, 5)))))))))))));
}
//LOGO part:
function logo() {
	function half_logo() {
		return stack_frac(2 / 36, draw_2(24, 2, 25), stack_frac(3 / 34, draw_2(23, 3, 25), stack_frac(3 / 31, draw_2(22, 3, 25), stack_frac(3 / 28, draw_2(21, 3, 25),
											stack_frac(2 / 25, draw_2(20, 2, 25), stack_frac(1 / 23, draw_3(2, 18, 1, 25), stack_frac(1 / 22, draw_3(5, 15, 1, 25),
												stack_frac(2 / 21, draw_3(8, 12, 2, 25), stack_frac(1 / 19, draw_3(11, 8, 1, 25), stack_frac(1 / 18, draw_3(12, 7, 1, 25),
													stack_frac(1 / 17, draw_4(1, 13, 5, 1, 25), stack_frac(1 / 16, draw_4(1, 14, 4, 1, 25), stack_frac(1 / 15, draw_4(1, 15, 3, 1, 25),
														stack_frac(1 / 14, draw_4(2, 15, 2, 1, 25), stack_frac(1 / 13, blank_line(), stack_frac(1/12, draw_2(3, 1, 25),
															stack_frac(1 / 11, draw_2(4, 1, 25), stack_frac(1 / 10, blank_line(), stack_frac(1 / 9, draw_2(6, 1, 25),
																stack_frac(1 / 8, draw_2(7, 1, 25), stack_frac(1 / 7, blank_line(), stack_frac(2 / 6, draw_4(11, 11, 1, 2, 25),
																	stack_frac(1 / 4, draw_4(12, 11, 1, 1, 25),stack_frac(2 / 3, draw_4(15, 8, 1, 2, 25), draw_2(24, 1, 25)))))))))))))))))))))))));
	}
 	return beside(half_logo(), flip_horiz(half_logo()));
}
	return stack_frac(36 / 48, logo(), stack_frac(2 / 12, blankn(2, 50), adidas()));
}
clear_all();
show(jiangsheng_2d_contest_1());