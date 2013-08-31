// File: mission_2_3.js

// Feel free to use these task files for offline use, outside of JFDI.
// Please copy and paste the functions you have written into the Source Code tab
// as per Submission guidelines when you are done.
	        
function fractal(pic, n){
    if (n === 1) {
		return pic;
	} else {
		return beside(pic, stack(fractal(pic, n-1), fractal(pic, n-1)));
	}
}

// Test
show(fractal(make_cross(rcross_bb), 7));
                
