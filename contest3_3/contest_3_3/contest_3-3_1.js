// File: contest_3-3_1.js

// First entry
function stars() {
	return overlay_frac(0,translate(0, -0.30, scale(1/3,pentagram_bb)),overlay_frac(0, overlay_frac(0, translate(-0.27, -0.1, scale(1/3,pentagram_bb)), overlay_frac(0,translate(-0.165, 0.23, scale(1/3,pentagram_bb)),translate(0.165, 0.23, scale(1/3,pentagram_bb)))),translate(0.27, -0.1, scale(1/3,pentagram_bb))));
}
function circle() {
	return overlay_frac(9/10,translate(0.10,0,scale(3/4,circle_bb)),translate(-0.10,0,scale(3/4,circle_bb)));
}

clear_all();
show(overlay_frac(50/100,translate(0.10,0,scale(1/2,stars())),circle()));
