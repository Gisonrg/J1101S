// File: contest_3-2_1.js
// Second entry
function jiangsheng_2d_contest_1() {
function print_total() {
//common function:
function beside_frac(frac, pic_a, pic_b)
{
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
//ADIDAS part:
function adidas() {
	function print_a() {
	function b1() {
		return beside_frac(5 / 7, blankn(1, 5), blackn(1, 2));
	}
	
	function b2() {
		return beside_frac(2 / 7, blankn(1, 2), blackn(1, 5));
	}
	
	function b3() {
		return beside_frac(2 / 7, blackn(1, 2), beside_frac(3 / 5, blankn(1, 3), blackn(1, 2)));
	}
	
	function b4() {
		return beside_frac(1 / 7, blackn(1, 1), beside_frac(4 / 6, blankn(1, 4), blackn(1, 2)));
	}
	
	function b5() {
		return beside_frac(2 / 7, blackn(1, 2), beside_frac(3 / 5, blankn(1, 3), blackn(1, 2)));
	}
	
	function b6() {
		return beside_frac(2 / 7, blankn(1, 2), blackn(1, 5));
	}
	
	return stack_frac(2 / 10, blankn(2, 7), stack_frac(1 / 8, b1(), stack_frac(1 / 7, b2(), stack_frac(1 / 6, blackn(1, 7), stack_frac(1 / 5, b3(),
			stack_frac(1 / 4, b4(), stack_frac(1 / 3, b5(), stack_frac(1 / 2, blackn(1, 7), b6()))))))));
}

function print_d() {
	function c1() {
		return beside_frac(5 / 7, blankn(1, 5), blackn(1, 2));
	}
	
	function c2() {
		return beside_frac(2 / 7, blankn(1, 2), blackn(1, 5));
	}
	
	function c3() {
		return beside_frac(2 / 7, blackn(1, 2), beside_frac(3 / 5, blankn(1, 3), blackn(1, 2)));
	}
	
	function c4() {
		return beside_frac(1 / 7, blackn(1, 1), beside_frac(4 / 6, blankn(1, 4), blackn(1, 2)));
	}
	
	function c5() {
		return beside_frac(2 / 7, blackn(1, 2), beside_frac(3 / 5, blankn(1, 3), blackn(1, 2)));
	}
	
	function c6() {
		return beside_frac(2 / 7, blankn(1, 2), blackn(1, 5));
	}
	
	return stack_frac(2 / 10, stack(c1(), c1()), stack_frac(1 / 8, c1(), stack_frac(1 / 7, c2(), stack_frac(1 / 6, blackn(1, 7), 
		       stack_frac(1 / 5, c3(), stack_frac(1 / 4, c4(), stack_frac(1 / 3, c5(), stack_frac(1 / 2, blackn(1, 7), c6()))))))));
}

function print_i() {
	return stack_frac(2 / 10, blackn(2, 2), stack_frac(1 / 8, blankn(1, 2), blackn(2, 8)));
}

function print_s() {
	function d1() {
		return beside_frac(1 / 6, blackn(1, 1), beside_frac(4 / 5, blackn(1, 4), blankn(1, 1)));
	}
	
	function d2() {
		return beside_frac(2 / 6, blackn(1, 2), beside_frac(2 / 4, blankn(1, 2), blackn(1, 2)));
	}
	
	function d3() {
		return beside_frac(3 / 6, blackn(1, 3), blankn(1, 3));
	}
	
	function d4() {
		return beside_frac(3 / 6, blankn(1, 3), blackn(1, 3));
	}
	
	function d5() {
		return beside_frac(1 / 6, blankn(1, 1), blackn(1, 5));
	}
	return stack_frac(3 / 10, blankn(3, 6), stack_frac(1 / 7, d1(), stack_frac(1 / 6, d2(), stack_frac(1 / 5, d3(), stack_frac(1 / 4, d1(), 
		       stack_frac(1 / 3, d4(), stack_frac(1 / 2, d2(), d5())))))));
	}	
	return beside_frac(4 / 50, blankn(10, 4), beside_frac(7 / 46, print_a(), beside_frac(1 / 39, blankn(10, 1), beside_frac(7 / 38, print_d(),
		       beside_frac(1 / 31, blankn(10, 1), beside_frac(2 / 30, print_i(), beside_frac(1 / 28, blankn(10, 1), beside_frac(7 / 27, print_d(),
			       beside_frac(1 / 20, blankn(10, 1), beside_frac(7 / 19, print_a(), beside_frac(1 / 12, blankn(10, 1), beside_frac(6 / 11, print_s(), blankn(10, 5)))))))))))));
}
//LOGO part:
function logo() {
	function a1() {
		return beside_frac(24 / 25, blankn(2, 24), blackn(2, 1));
	}

	function a2() {
		return beside_frac(23 / 25, blankn(3, 23), blackn(3, 2));
	}
	
	function a3() {
		return beside_frac(22 / 25, blankn(3, 22), blackn(3, 3));
	}

	function a4() {
		return beside_frac(21 / 25, blankn(3, 21), blackn(3, 4));
	}

	function a5() {
		return beside_frac(20 / 25, blankn(2, 20), blackn(2, 5));
	}

	function a6() {
		return beside_frac(2 / 25, blackn(1, 2), beside_frac(18 / 23, blankn(1, 18), blackn(1, 5)));
	}

	function a7() {
		return beside_frac(5 / 25, blackn(1, 5), beside_frac(15 / 20, blankn(1, 15), blackn(1, 5)));
	}

	function a8() {
		return beside_frac(8 / 25, blackn(2, 8), beside_frac(12 / 17, blankn(2, 12), blackn(2, 5)));
	}

	function a9() {
		return beside_frac(11 / 25, blackn(1, 11), beside_frac(8 / 14, blankn(1, 8), blackn(1, 6)));
	}

	function a10() {
		return beside_frac(12 / 25, blackn(1, 12), beside_frac(7 / 13, blankn(1, 7), blackn(1, 6)));
	}

	function draw_4(frac_1, frac_2, frac_3, hight) {
		return beside_frac(frac_1 / 25, blankn(hight, frac_1), beside_frac(frac_2 / (25 - frac_1), blackn(hight, frac_2), 
			       beside_frac(frac_3 / (25 - frac_1 - frac_2), blankn(hight, frac_3), blackn(hight, 25 - frac_1 - frac_2 - frac_3))));
	}	
	/*
	//draw_4(1, 13, 5, 1);
	function a11() {
		return beside_frac(1 / 25, blankn(1, 1), beside_frac(13 / 24, blackn(1, 13), beside_frac(5 / 11, blankn(1, 5), blackn(1, 6))));
	}
	//draw_4(1, 14, 4, 1);
	function a12() {
		return beside_frac(1 / 25, blankn(1, 1), beside_frac(14 / 24, blackn(1, 14), beside_frac(4 / 10, blankn(1, 4), blackn(1, 6))));
	}
	//draw_4(1, 15, 3, 1);
	function a13() {
		return beside_frac(1 / 25, blankn(1, 1), beside_frac(15 / 24, blackn(1, 15), beside_frac(3 / 9, blankn(1, 3), blackn(1, 6))));
	}
	//draw_4(2, 15, 2, 1);
	function a14() {
		return beside_frac(2 / 25, blankn(1, 2), beside_frac(15 / 23, blackn(1,15), beside_frac(2 / 8, blankn(1, 2), blackn(1, 6))));
	}
	*/
	function a15() {
		return besiden(25, blank_bb);
	}

	function a16() {
		return beside_frac(3 / 25, blankn(1, 3), blackn(1, 22));
	}

	function a17() {
		return beside_frac(4 / 25, blankn(1, 4), blackn(1, 21));
	}

	function a18() {
		return besiden(25, blank_bb);
	}

	function a19() {
		return beside_frac(6 / 25, blankn(1, 6), blackn(1, 19));
	}

	function a20() {
		return beside_frac(7 / 25, blankn(1, 7), blackn(1, 18));
	}

	function a21() {
		return besiden(25, blank_bb);
	}

	function a22() {
		return beside_frac(11 / 25, blankn(2, 11), beside_frac(11 / 14, blackn(2, 11), beside_frac(1 / 3, blankn(2, 1), blackn(2, 2))));
	}

	function a23() {
		return beside_frac(12 / 25, blankn(1, 12), beside_frac(11 / 13, blackn(1, 11), beside_frac(1 / 2, blankn(1, 1), blackn(1, 1))));
	}

	function a24() {
		return beside_frac(15 / 25, blankn(2, 15), beside_frac(8 / 10, blackn(2,8), beside_frac(1 / 2, blankn(2, 1), blackn(2, 1))));
	}

	function a25() {
		return beside_frac(24 / 25,blankn(1, 24), blackn(1, 1));
	}
	
	function half_logo() {
		return stack_frac(2 / 36, a1(), stack_frac(3 / 34, a2(), stack_frac(3 / 31, a3(), stack_frac(3 / 28, a4(),
											stack_frac(2 / 25, a5(), stack_frac(1 / 23, a6(), stack_frac(1 / 22, a7(),
												stack_frac(2 / 21, a8(), stack_frac(1 / 19, a9(), stack_frac(1 / 18, a10(),
													stack_frac(1 / 17, draw_4(1, 13, 5, 1), stack_frac(1 / 16, draw_4(1, 14, 4, 1), stack_frac(1 / 15, draw_4(1, 15, 3, 1),
														stack_frac(1 / 14, draw_4(2, 15, 2, 1), stack_frac(1 / 13, a15(), stack_frac(1/12, a16(),
															stack_frac(1 / 11, a17(), stack_frac(1 / 10, a18(), stack_frac(1 / 9, a19(),
																stack_frac(1 / 8, a20(),stack_frac(1 / 7, a21(), stack_frac(2 / 6, a22(),
																	stack_frac(1 / 4, a23(),stack_frac(2 / 3, a24(), a25()))))))))))))))))))))))));
	}
 	return beside(half_logo(), flip_horiz(half_logo()));
}
	return stack_frac(36 / 48, logo(), stack_frac(2 / 12, blankn(2, 50), adidas()));
}
	return print_total();
}
clear_all();
show(jiangsheng_2d_contest_1());