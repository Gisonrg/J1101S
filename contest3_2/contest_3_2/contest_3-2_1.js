// File: contest_3-2_1.js
// First entry
function jiangsheng_2d_contest_0() {
    function beside_frac(frac, pic_a, pic_b) {
		return quarter_turn_left(stack_frac(frac, quarter_turn_right(pic_a), quarter_turn_right(pic_b)));
	}
 
	function beside_n(n, pic) {
		return quarter_turn_left(stackn(n, quarter_turn_right(pic)));
	}
	function part_up() {
		function print_c(pic) {
			return stack_frac(1 / 6, beside_n(5, pic), stack_frac(4 / 5, beside_frac(1 / 5, stackn(4, pic), beside_frac(3 / 4, blank_bb, stackn(4,  blank_bb))), beside_n(5, pic)));
		}
		function print_s(pic) {
			return stack_frac(1 / 6, beside_n(5, pic),
				    	stack_frac(1 / 5, beside_frac(1 / 5,pic, beside_n(4, blank_bb)),
							stack_frac(1 / 4, beside_n(5, pic), stack_frac(2 / 3, beside_frac(4 / 5,beside_n(4, blank_bb), pic), beside_n(5, pic)))));
		}
	return beside_frac(5 / 12,print_c(black_bb),beside_frac(2 / 7, stackn(6, blank_bb),print_s(black_bb)));
	}
	function part_down() {
		function print_part_one(pic) {
			return beside_frac(1 / 3, stackn(4, pic), beside_frac(1 / 2, stackn(4, blank_bb), stackn(4, black_bb)));
		}
		function heart() {
			return heart_bb;
		}

		function print_part_three(pic) {
			return beside_frac(1 / 5, stackn(4, pic), beside_frac(1 / 4, stack_frac(1 / 4, pic, stack_frac(2 / 3, stackn(2, blank_bb), pic)), beside_frac(1 / 3, stackn(4, pic), beside_frac(1 / 2, stackn(4, blank_bb),stackn(4, pic)))));
		}
	return beside_frac(3 / 12, print_part_one(black_bb), beside_frac(4 / 9, heart(), print_part_three(black_bb)));
	}
	return stack_frac(6 / 11, part_up(), stack_frac(1 / 5, beside_n(12, blank_bb), part_down()));
}

clear_all();
show(jiangsheng_2d_contest_0());