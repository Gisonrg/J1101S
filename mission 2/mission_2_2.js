// File: mission_2_2.js

// Feel free to use these task files for offline use, outside of JFDI.
// Please copy and paste the functions you have written into the Source Code tab
// as per Submission guidelines when you are done.
	        
function simple_fractal(pic){
    return beside(pic, stack(pic, pic));
}

// Test
show(simple_fractal(make_cross(rcross_bb)));
                
