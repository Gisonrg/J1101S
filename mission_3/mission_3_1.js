// File: mission_3_1.js
clear_all();	        
function left_top(pic) {
	return beside(stack(pic, blank_bb), stack(blank_bb, blank_bb));
}
function left_down(pic) {
	return beside(stack(blank_bb, pic), stack(blank_bb, blank_bb));
}

function right_down(pic) {
	return beside(stack(blank_bb, blank_bb), stack(blank_bb, pic));
}

function right_top(pic) {
	return beside(stack(blank_bb, blank_bb), stack(pic, blank_bb));
}

function steps(p1, p2, p3, p4) {
    // your answer here
	return overlay_frac(1/4, left_top(p4), 
								overlay_frac(1/3, left_down(p3), 
															overlay(right_down(p2), right_top(p1))));
}


// Test
show(steps(rcross_bb, rcross_bb, rcross_bb, rcross_bb));