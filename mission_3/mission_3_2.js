// File: mission_3_2.js
/*	        
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
*/
// Test
show(overlay_frac(0, circle_bb, tanslate(0.5,0,blank_bb)));
                