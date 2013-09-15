// (a)
// define constructor and selectors

function make_signed_message(message, signature) {
	return pair(message, signature);
}

function get_message(signed_message) {
	return head(signed_message);
}

function get_signature(signed_message) {
	return tail(signed_message);
}

// (b)

function encrypt_and_sign(msg, sender_private_key, recipient_public_key) {
	var message = RSA_encrypt(msg, recipient_public_key);
	var signature = RSA_encrypt(intlist_to_string(list(bigInt_to_int(compress(message)))), sender_private_key);
	return make_signed_message(message, head(signature));
}

// Test your function
//var result2 = encrypt_and_sign("Test message from user 1 to user 2", test_private_key1, test_public_key2);
//display(result2);
// Result should be
// pair(list(296342791, 45501589, 263575681, 219298391, 4609203, 331301818, 178930017, 242685109, 1345058), 254363563)

// (c)
//decrypt function in Mission 8

function RSA_decrypt(intlist, key2) {
	function RSA_unconvert_list(intlist, key) {
		var n = int_to_bigInt(key_modulus(key));
		var bigIntList = map(int_to_bigInt, intlist);

		function unconvert(lst, sum) {
			if (is_empty_list(lst)) {
				return [];
			} else {
				var front = head(lst);
				var x = modulo(add(RSA_transform(front, key), sum), n);
				return pair(bigInt_to_int(x), unconvert(tail(lst), front));
			}
		}
		return unconvert(bigIntList, int_to_bigInt(0));
	}
	return intlist_to_string(RSA_unconvert_list(intlist, key2));
}

function authenticate_and_decrypt(signed_message, sender_public_key, recipient_private_key) {
	var signature = head(string_to_intlist(RSA_decrypt(list(get_signature(signed_message)), sender_public_key)));
	if (equalsInt(compress(get_message(signed_message)), signature)) {
		return RSA_decrypt(get_message(signed_message), recipient_private_key);
	} else {
		return "Unauthentic Message!";
	}
}

//display(authenticate_and_decrypt(result2, test_public_key1, test_private_key2));
// Result should be
// "Test message from user 1 to user 2  "



//Task 2:
//define input
var list_of_sender = list(Alice_public_key, Ben_public_key, Chris_public_key, David_public_key, Eli_public_key);

function test(lst_of_sender) {
	//combine the message and the signature
	var message = make_signed_message(received_mystery_message, received_mystery_signature);

	//I create a list in order to output the name
	var name_list = list(pair("Alice", Alice_public_key), pair("Ben", Ben_public_key), pair("Chris", Chris_public_key),
		pair("David", David_public_key), pair("Eli", Eli_public_key));

	//this is a function to ouput the name using the "name_list"

	function name(key, lst) {
		if (key === tail(head(lst))) {
			return head(head(lst));
		} else {
			return name(key, tail(lst));
		}
	}

	//this is the main function which compare the signature and give the sender's key

	function helper(lst, sender_key, private_key) {
		if (is_empty_list(lst)) {
			return "No Result!";
		} else if (authenticate_and_decrypt(message, sender_key, private_key) === "Unauthentic Message!") {
			return helper(tail(lst), head(tail(lst)), private_key);
		} else {
			return sender_key;
		}
	}

	//to output the message
	var decrypted_msg = RSA_decrypt(get_message(message), Darth_private_key);

	//using display function to show the printout
	return display("The message is :\n\"" + decrypted_msg + "\", \nand the sender is " +
		name(helper(lst_of_sender, head(lst_of_sender), Darth_private_key), name_list) + "!");
}

//test:
//test(list_of_sender);