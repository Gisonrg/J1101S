// Task 1
	        
// Faster order of growth:

// i.  4^nn^2
// ii. 2^n/1000000000
// iii. n^n+n^2+1
// iv.  n^2

// Order notations:

// 4^nn^2:   O(4^nn^2)
// n3^n:     O(n3^n)
// 1000000000n^2:     O(n^2)
// 2^n/1000000000:    O(2^n)
// n^n+n^2+1:   O(n^n)
// 4^n+2^n:     O(4^n)
// 1^n:         O(1)
// n^2:         O(n^2)
                
// Task 2
	        
// Order of growth for running time: O(n)
// Order of growth for memory requirement: O(n)
                
// Task 3
	        
// i.
// Order of growth for running time for bar: O(n)
// Order of growth for running time for foo: O(n^2)

// ii.
// Order of growth for memory requirement for bar: O(n)
// Order of growth for memory requirement for foo: O(n)

// iii.
//1.
function improved_foo(n) {
    // your answer here
	function new_foo(total, counter, max_count) {
		if (counter > max_count) {
			return total;
		} else {
			return new_foo(total + (counter * (counter + 1) / 2), counter + 1, max_count);
		}
	}
	return new_foo(0, 1, n);
}

//2.
function improved_foo(n) {
	function new_foo(total, counter, max_count) {
		if (counter > max_count) {
			return total;
		} else {
			return new_foo(total + (counter * (counter + 1) / 2), counter + 1, max_count);
		}
}
return new_foo(0, 1, n);
}


// Order of growth for running time: O(n)
// Order of growth for memory: O(1)
                