// File: mission_1_1.js
	        
// 42;
/* final ans:42 */

// 0000;
/* final ans:0 */

// "the force!";
/* final ans: the force! */

// 6 * 9;
/* final ans: 54 */

// "2 + 3";
/* final ans: 2 + 3 */

// 1 / 0;
/* expected ans: error 
   final ans: Infinity	*/

// var red = 44;
/* final ans: undefined */

// var green = 43;
/* final ans: undefined */

// red - green;
/* final ans: 1 */

// var blue = green;
/* final ans: undefined */

// var purple = blue + green;
/* final ans: undefined */

// green(5);
/* final ans: error */

// (function(x, y, z){ return x; });
/*  expected ans: undefined;
	final ans: function(x, y, z){ return x; } */

// (function(x, y){ return x + y; })(4, 3 + 4);
/* final ans: 11 */

// (function(wow, it, works){ return wow(it, works); })(function(a, b){ return a - b; }, 7, 5);
/* final ans: 2 */

// (function(wow, it, works){ return works(wow, it); })(5, 7, function(a, b){ return a - b; });
/* final ans: -2 */

// var x = 2; 
// (function(x){ return x + x; })(5);
/* final ans: 10*/

// (function(rune){ return rune * rune; })(5);
/* final ans: 25 */

// rune;
/* final ans: error */

/*
If you still have doubts over how some expressions are evaluated, 
please indicate them here. 

1. For the statement 1 / 0; why it can give the answer infinity? I thought it could be an error or undefined since it is meaningless.
2. Statement(function(x, y, z){ return x; }); will return function(x, y, z){ return x; } 
   Is this because it is evaluated as a function expression?
3. For the // var x = 2; 
		   // (function(x){ return x + x; })(5);  
		   it returned 10. 
		   So the x defined outside the function declarition can have the same name as the argument. 
		   Why is that? Is it because of the "global variable and local variable"? 
		   
Thank you!
*/