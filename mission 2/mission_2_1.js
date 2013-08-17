// File: mission_2_1.js

// Feel free to use these task files for offline use, outside of JFDI.
// Please copy and paste the functions you have written into the Source Code tab
// as per Submission guidelines when you are done.
	        
function mosaic(p1, p2, p3, p4){
    return beside(stack(p4, p3), stack(p1, p2));
}

// Test
show(mosaic(rcross_bb, sail_bb, corner_bb, nova_bb));
                
