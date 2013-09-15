// Converts a string into a list
function string_to_list(str) {
	if (str.length === 0) {
		return [];
    } else {
		return pair(str[0], string_to_list(str.substring(1))); // Omitted "to" in substring = until end of string
    }
}

// As opposed to list_to_string in "list.js" which returns lists in [] notation
function list_to_string_without_brackets(lst) {
	if (length(lst) === 1)
		return head(lst);
	else
		return head(lst) + list_to_string_without_brackets(tail(lst));
}

// Appends strings together
function string_append() {
	if (arguments.length < 2)
		console.log("Error. Invalid number of arguments");
	else {
		var result = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			result = result.concat(arguments[i]);
		}
		return result;
	}
}

// Returns true if the first character of aChar is an alphabet.
// Returns false otherwise.
function is_alpha(aChar) {
    myCharCode = aChar.charCodeAt(0);
    if (((myCharCode > 64) && (myCharCode <  91)) || ((myCharCode > 96) && (myCharCode < 123))) {
        return true;
    } else {
        return false;
    }
}

function char_code(char){
    return char.charCodeAt(0);
}

function uppercase(char){
    return char.toUpperCase();
}

// Returns num (mod base)
function modulo(num, base) {
    var n = num;
    while (true) {
        if (n >= 0 && n < base) {
            return n;
        } else {
            if (n < 0) {
                n += base;
            } else {
                // n > base
                n -= base;
            }
        }
    }
}