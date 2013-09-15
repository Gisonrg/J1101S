function is_null(xs) {
	return xs === null;
}

function is_number(xs) {
	return typeof xs === "number";
}

function is_string(xs) {
	return typeof xs === "string";
}

function is_boolean(xs) {
	return typeof xs === "boolean";
}

function is_object(xs) {
	return typeof xs === "object" || is_function(xs);
}

function is_function(xs) {
	return typeof xs === "function";
}

function is_NaN(x) {
	return is_number(x) && isNaN(x);
}

function has_own_property(obj,p) {
	return obj.hasOwnProperty(p);
}

function is_array(a){
	return a instanceof Array; 
}

function runtime() {
	var d = new Date();
	return d.getTime();
}

/**
 * Throws an error from the interpreter, stopping execution.
 *
 * @param {string} message The error message.
 * @param {number=} line The line number where the error occurred. This line number
 *                       will be one less than on file, because the indices used by
 *                       jison start from 0.
 * @returns {null} Should not return. Exception should be thrown otherwise program
 *                 will be in an invalid state.
 */
function error(message, line) {
	throw new SyntaxError(message, null,
		line === undefined ? undefined : line + 1);
}

function newline(){
	display("\n");
}

function display(str){
	if (is_array(str) && is_empty_list(str)) {
		str = '[]';
	} else if (is_pair(str)) {
		var displayStr = '';
		var count = 0;
		while (!is_empty_list(str)) {
			displayStr += '[' + head(str) + ', ';
			str = tail(str);
			++count;
		}
		
		//Add one bracket for the last empty element.
		displayStr += '[';
		++count;

		str = displayStr + (function() {
			var result = ']';
			for (var i = 1; (i *= 2) <= count; ) {
				result += result;
			}
			for (var i = result.length; i !== count; ++i) {
				result += ']';
			}
			return result;
		}());
	}
	//process.stdout.write(str);
	console.log(str);
	return str;
}

function random(k){
	return Math.floor(Math.random()*k);
}

function read(x) {
	return prompt(x);
}

function write(x) {
	return alert(x);
}

function parse(x) {
    if (x === null) {
        return {"tag": "exit"};
    } else {
        return parser.parse(x);
    }
}

function apply_in_underlying_javascript(prim,argument_list) {
   var argument_array = list_to_vector(argument_list);

   //Call prim with the same this argument as what we are running under.
   //this is populated with an object reference when we are an object. We
   //are not in this context, so this will usually be the window. Thus
   //passing this as the argument shouls behave. (Notably, passing the
   //function itself as a value of this is bad: if the function that is being
   //called assumes this to be window, we'll clobber the function value instead.
   //Also, alert won't work if we pass prim as the first argument.)
   return prim.apply(this, argument_array);
}
