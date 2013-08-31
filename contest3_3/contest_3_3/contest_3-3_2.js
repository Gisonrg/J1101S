// File: contest_3-3_2.js	        
// Second entry
function stars() {
	return overlay_frac(0,translate(0, -0.30, scale(1/3,pentagram_bb)),overlay_frac(0, overlay_frac(0, translate(-0.27, -0.1, scale(1/3,pentagram_bb)), overlay_frac(0,translate(-0.165, 0.23, scale(1/3,pentagram_bb)),translate(0.165, 0.23, scale(1/3,pentagram_bb)))),translate(0.27, -0.1, scale(1/3,pentagram_bb))));
}
function circle() {
	return overlay_frac(9/10,translate(0.10,0,scale(3/4,circle_bb)),translate(-0.10,0,scale(3/4,circle_bb)));
}

function tree(n, painter) {
    // your answer here
	function treen(i,n,pic) {
		if (i === n) {
			return pic;
		} else {
			return overlay_frac(1 / (1 + (n - i)), scale(i / n, pic), treen(i + 1, n, pic));
		}
	}
	
	return treen(1, n, painter);
}


function yourname_3d_contest_1() {
	return tree(10,stars());
}

clear_all();
show(yourname_3d_contest_1());
