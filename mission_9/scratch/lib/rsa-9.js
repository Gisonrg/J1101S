/*
Notes for library maintainer:
1)	Remember to include "list.js" and "BigInt.js"
2)	Everything except conversion functions (e.g. charlist_to_integer) are all in BigInt
3)	All boolean returns are actually 1 and 0 instead of true and false
4)	I use 10 bits and array of size 10 for BigInt conversions.
	It seems large enough and easy to remember.
	It'll auto resize the array after a BigInt.js operation anyway, so no worries.
*/

//------------------------------------------------------------
// RSA-specific functions
function is_even(x) {
	return (modInt(x,2) === 0);
}

function int_to_string(integer) {
    return integer.toString(10); // Base 10
}

function string_to_int(string) {
	return parseInt(string,10); // Base 10
}

function int_to_bigInt(x) {
    return str2bigInt(int_to_string(x),10,10,10);
}

function str_to_bigInt(s) {
    return str2bigInt(s,10,10,10);
}

function bigInt_to_int(bi) {
	return string_to_int(bigInt2str(bi,10));
}

function bigInt_GCD_is_1(x,y) {
    return (equalsInt(GCD(x,y),1) === 1 && equalsInt(GCD(y,x),1) === 1);
}

function quotient(num, div) {
	return Math.floor(num/div);
}

function remainder(num, div) {
	return mod(num, div);
}

function square(x) {
	return mult(x,x);
}

function string_to_list(str) {
	if (str.length === 0)
		return [];
	else
		return pair(str[0],string_to_list(str.substring(1))); // Omitted "to" in substring = until end of string
}

// As opposed to list_to_string in "list.js" which returns lists in [] notation
function list_to_string_without_brackets(lst) {
	if (length(lst) === 1)
		return head(lst);
	else
		return head(lst) + list_to_string_without_brackets(tail(lst));
}

function make_string(num, character) {
	function make_list(num, character) {
		if (num === 0)
			return [];
		else
			return pair(character, make_list(num-1,character));
	}

	return list_to_string_without_brackets(make_list(num, character));
}

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

function modulo(num, modval) {
	return remainder(num, modval);
}

function positify(front,sum,n) {
	if (front - sum - n < 0)
		return positify(front + n, sum, n);
	else
		return front;
}

function integer_to_char(integer) {
	return String.fromCharCode(integer);
}

// From javascript.js (but apparently missing in list.js and misc.js)
function apply(f,xs) {
    var args = [];
    var len = length(xs);
    for (var i=0; i < len; i++) {
       args[i] = head(xs);
       xs = tail(xs);
    }
    return f.apply(f,args);
}

// Use this instead of append() because append() only works for 2 lists
function append2() {
	if (arguments.length < 2) {
		return arguments[0];
	} else if (arguments.length === 2) {
		return append(arguments[0],arguments[1]);
	} else {
		var front = arguments[0];
		var back = [];
		for (var i = 1; i < arguments.length; i++) {
			back[i-1] = arguments[i];
		}
		return append(front, append2.apply(append2,back));
	}
}

//------------------------------------------------------------

function expmod(b,e,m) {
	return powMod(b, e, m);
}

// An RSA key consists of a modulus and an exponent.

var make_key = pair;
var key_modulus = head;
var key_exponent = tail;

function RSA_transform(number,key) {
	return expmod(number,
                  int_to_bigInt(key_exponent(key)),
                  int_to_bigInt(key_modulus(key)));
}

// generating RSA keys

// To choose a prime, we start searching at a random odd number in a specified range
// Warning: Due to unknown reasons in BigInt.js, the result is MOST PROBABLY a prime,
//          but beware, it might not be
function choose_prime(smallest,range) {
	var start = bigInt_to_int(add(smallest, choose_random(range)));

	if (start % 2 === 0)
		return search_for_prime(start + 1);
	else
		return search_for_prime(start);
}

function search_for_prime(guess) {
    if (prime_test(guess)) {
        return guess;
    } else {
        return search_for_prime(guess + 2);
    }
}

// Workaround: convert n to int, do the usual stuff, then convert back
// Why: Because BigInt.js doesn't have a suitable random function
function choose_random(n) {
	var max_random_number = Math.pow(2,31)-1;
	var n2 = bigInt_to_int(n);
	return int_to_bigInt(Math.floor(Math.random() * Math.min(n2, max_random_number)));
    // Math.random() gives a value between 0 and 1
}

// BigInt.js has a nice functionality to check for primes.
function prime_test(n) {
    var primes = findPrimes(n + 1); // Returns all the primes < n + 1 in a list
    return (n === head(primes)); // Check if the greatest prime (the head of the list) === n
}

// RSA key pairs are pairs of keys

var make_key_pair = pair;
var key_pair_public = head;
var key_pair_private = tail;

// generate an RSA key pair (k1, k2).  This has the property that
// transforming by k1 and transforming by k2 are inverse operations.
// Thus, we can use one key as the public key andone as the private key.

function generate_RSA_key_pair() {
    var size = powMod(int_to_bigInt(2),
                      int_to_bigInt(14),
                      int_to_bigInt(9999999999));

    // we choose p and q in the range from 2^14 to 2^15.  This insures
    // that the pq will be in the range 2^28 to 2^30, which is large
    // enough to encode four characters per number.

    var p = int_to_bigInt(choose_prime(size,size));
    var q = int_to_bigInt(choose_prime(size,size));

    if (equals(p,q) === 1) { // check that we haven't chosen the same prime twice
        return generate_RSA_key_pair();
    } else {
        var n = mult(p,q);
        var m = mult(addInt(p, -1), addInt(q, -1));
        var e = select_exponent(m);
        var d = invert_modulo(e,m);

        // In case either p or q (or both) is not prime
        if (d === "gcd not 1") {
            return generate_RSA_key_pair();
        } else {
            return make_key_pair(make_key(n, e), make_key(n, d));
        }
    }
}

// The RSA exponent can be any random number relatively prime to m

function select_exponent(m) {
    var try_this = choose_random(m);
    if (bigInt_GCD_is_1(try_this,m)) {
        return try_this;
    } else {
        return select_exponent(m);
    }
}

// Invert e modulo m

function invert_modulo(e,m) {
	if (bigInt_GCD_is_1(e,m)) {
		var solved_tail = tail(solve_ax_plus_by_eq_1(bigInt_to_int(m),bigInt_to_int(e)));

		if (solved_tail < 0)
			solved_tail = positify(solved_tail,0,bigInt_to_int(m));

		return modulo(int_to_bigInt(solved_tail),m); // just in case y was negative
	} else {
		console.log("gcd not 1 " + e + " " + m);
        return "gcd not 1";
	}
}

// Actual RSA encryption and decryption

function RSA_encrypt(string,key1) {
	return RSA_convert_list(string_to_intlist(string), key1);
}

function RSA_convert_list(intlist, key) {
    var n = int_to_bigInt(key_modulus(key));
    var bigIntList = map(int_to_bigInt, intlist);

    function convert(lst, sum) {
        if (is_empty_list(lst)) {
            return [];
        } else {
            var front = head(lst);
            var x = RSA_transform(modulo(sub(front, sum), n), key);
            return pair(bigInt_to_int(x), convert(tail(lst), x));
        }
    }
    return convert(bigIntList, int_to_bigInt(0));
}

function RSA_decrypt(intlist,key2) {
	return intlist_to_string(RSA_unconvert_list(intlist,key2));
}

// The following routine compresses a list of numbers to a single
// number for use in creating digital signatures.

function compress(intlist) {
    function add_loop(l) {
        if (is_empty_list(l))
            return int_to_bigInt(0);
        else
            return add(int_to_bigInt(head(l)),
                       add_loop(tail(l)));
    }

    return modulo(add_loop(intlist),
                  powMod(int_to_bigInt(2),
                         int_to_bigInt(28),
                         int_to_bigInt(9999999999)));
}

// searching for divisors.
function smallest_divisor(n) {
	return find_divisor(n,int_to_bigInt(3));
}

function find_divisor(n, test_divisor) {
    if (greater(square(test_divisor), n) === 1) {
        return n;
    } else if (is_divides(test_divisor, n)) {
        return test_divisor;
    } else {
        return find_divisor(n, addInt(test_divisor, 2));
    }
}

function is_divides(a,b) {
	return (equalsInt(mod(b,a),0) === 1);
}

// converting between strings and numbers

// The following procedures are used to convert between strings, and
// lists of integers in the range 0 through 2^28.  You are not
// responsible for studying this code -- just use it.

// Convert a string into a list of integers, where each integer
// encodes a block of characters.  Pad the string with spaces if the
// length of the string is not a multiple of the blocksize

function string_to_intlist(string) {
	var blocksize = 4;
	var padded_string = pad_string(string,blocksize);
	var length = padded_string.length;
	return block_convert(padded_string, 0, length, blocksize);
}

function block_convert(string, start_index, end_index, blocksize) {
	if (start_index === end_index)
		return [];
	else {
		var block_end = start_index + blocksize;
		return pair(charlist_to_integer(string_to_list(string.substring(start_index, block_end))),
					block_convert(string, block_end, end_index, blocksize));
	}
}

function pad_string(string,blocksize) {
	var rem = string.length % blocksize;
	if (rem === 0)
		return string;
	else
		return string_append(string, make_string(blocksize - rem, ' '));
}

// Encode a list of characters as a single number
// Each character gets converted to an ascii code between 0 and 127.
// Then the resulting number is c[0]+c[1]*128+c[2]*128^2,...

function charlist_to_integer(charlist) {
	var n = head(charlist).charCodeAt(0);
	if (is_empty_list(tail(charlist)))
		return n;
	else
		return n+(128*(charlist_to_integer(tail(charlist))));
}

// Convert a list of integers to a string. (Inverse of
// string->intlist, except for the padding.)

function intlist_to_string(intlist) {
	return list_to_string_without_brackets(apply(append2, map(integer_to_charlist, intlist)));
}

// Decode an integer into a list of characters.  (This is essentially
// writing the integer in base 128, and converting each "digit" to a
// character.)

function integer_to_charlist(integer) {
	if (integer < 128) {
		return (list (integer_to_char(integer)));
	}
	else {
		return pair(integer_to_char(bigInt_to_int(remainder(	int_to_bigInt(integer),
															int_to_bigInt(128)))),
					integer_to_charlist(quotient(integer,128)));
	}
}

/*
----------------------
From previous Missions
----------------------
*/
function RSA_unconvert_list(intlist, key) {
    var n = int_to_bigInt(key_modulus(key));
    function unconvert(l, sum) {
        if (is_empty_list(l))
            return [];
        else {
            var front = int_to_bigInt(head(l));
            var x = RSA_transform(front, key);
            return pair(bigInt_to_int(modulo(add(x,sum), n)),
                        unconvert(tail(l), front));
        }
    }

    return unconvert(intlist, int_to_bigInt(0));
}
/*
----------------------
From previous Missions
----------------------
*/

// Some initial test data

var test_key_pair1 = make_key_pair(	make_key(385517963, 90747943),
									make_key(385517963, 137332327));
var test_key_pair2 = make_key_pair( make_key(432208237, 282377377),
									make_key(432208237, 401849313));

var test_public_key1 = key_pair_public(test_key_pair1);
var test_private_key1 = key_pair_private(test_key_pair1);

var test_public_key2 = key_pair_public(test_key_pair2);
var test_private_key2 = key_pair_private(test_key_pair2);

// Public keys of involved parties.

var Darth_public_key = make_key(718392397, 559318161);
var Darth_private_key = make_key(718392397, 708457521);

var Alice_public_key = make_key(998036089, 806109659);
var Ben_public_key = make_key(504839983, 227999945);
var Chris_public_key = make_key(864136379, 572774993);
var David_public_key = make_key(733058129, 420349319);
var Eli_public_key = make_key(400984687, 70529231);

// message received by Darth -- Who sent it?
var received_mystery_message =
	list (	255535865, 487823975, 233970006, 402199677, 684685730, 495370893, 505793783, 430488766, 706214252, 701906712,
			305848322, 605390796, 44672387, 470688259, 699083046, 303611674, 16613960, 675393316, 201697511, 147339103,
            560643168, 654148963, 277682072, 342352584, 617660257, 422975289, 555587970, 103807775, 557422647, 374444501,
            140739994, 549426840, 556644462, 521432724, 651694770, 194873304, 529339110, 280220529, 158479350, 447705539,
            231698566, 347088280, 59785819, 318454513, 562783015, 653512755, 495999475, 614259296, 473944195, 112519619,
            251469208, 476180269, 129061314, 36061245, 467666520, 571601389, 254080342, 108854174, 605316599, 685557750,
            445382011, 399868489, 313285282, 14035940, 612810585, 174051163, 243706231, 156811452, 620088431, 367796561,
            132457378, 120747903, 544949799, 583103126, 225638470, 687196941, 347447348);

var received_mystery_signature = 436326658;