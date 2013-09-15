// File: sidequest_9-1_1.js

//This function is to shift the original char to the new one.
function encrypt(shift_length, char) {
	var abc_lst = string_to_list("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	var char = uppercase(char);

	function get_shift(shift) {
		if ((shift <= 26) && (shift >= 0)) {
			return shift;
		} else {
			return get_shift(modulo(shift, 26));
		}
	}

	function get_char(shift, counter, lst) {
		if (counter === shift) {
			return head(lst);
		} else {
			return get_char(shift, counter + 1, tail(lst));
		}
	}
	var shift = get_shift(modulo(char_code(char) + modulo(shift_length, 26), 64));
	return get_char(shift, 1, abc_lst);
}

function caesar_encrypt(shift_length, original_message) {
	var original_list = string_to_list(original_message);
	var cipher_list = [];

	function transfer(lst, output) {
		if (is_empty_list(lst)) {
			return output;
		} else if (is_alpha(head(lst))) {
			return transfer(tail(lst), append(output, list(encrypt(shift_length, head(lst)))));
		} else {
			return transfer(tail(lst), append(output, list(head(lst))));
		}
	}
	return list_to_string_without_brackets(transfer(original_list, cipher_list));
}

function caesar_decrypt(shift_length, encrypted_message) {
	return caesar_encrypt(-shift_length, encrypted_message);
}

// Test your functions
display(caesar_encrypt(3, "the quick brown fox jumps over the lazy dog *#*$@#&"));
display(caesar_decrypt(3, caesar_encrypt(3, "the quick brown fox jumps over the lazy dog")));

//This function is to create a new dictionary for Ciphertext.
function make_new_abc(keyword) {
	var abc_lst = string_to_list("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

	function upperlize(lst) {
		return map(uppercase, lst);
	}
	var key_lst = upperlize(string_to_list(keyword));

	function helper(key_lst, reference, output) {
		if (is_empty_list(reference)) {
			return output;
		} else if (equal(member(head(reference), key_lst), [])) {
			return helper(key_lst, tail(reference), append(output, list(head(reference))));
		} else {
			return helper(key_lst, tail(reference), output);
		}
	}
	return helper(key_lst, abc_lst, key_lst);
}

function mixed_encrypt(keyword, original_message) {
	var abc_lst = string_to_list("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

	function get_char(shift, counter, lst) {
		if (counter === shift) {
			return head(lst);
		} else {
			return get_char(shift, counter + 1, tail(lst));
		}
	}

	var original_list = string_to_list(original_message);
	var cipher_list = [];
	var new_abc_lst = make_new_abc(keyword);

	function transfer(lst, output) {
		if (is_empty_list(lst)) {
			return output;
		} else if (is_alpha(head(lst))) {
			var shift = modulo(char_code(uppercase(head(lst))), 64);
			return transfer(tail(lst), append(output, list(get_char(shift, 1, new_abc_lst))));
		} else {
			return transfer(tail(lst), append(output, list(head(lst))));
		}
	}
	return list_to_string_without_brackets(transfer(original_list, cipher_list));
}

function mixed_decrypt(keyword, encrypted_message) {
	var abc_lst = string_to_list("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

	//this function is to find the postion number in the original dictionary for encrypted char.
	function find_position(ch, counter, lst) {
		if (ch === head(lst)) {
			return counter;
		} else {
			return find_position(ch, counter + 1, tail(lst));
		}
	}

	var original_list = string_to_list(encrypted_message);
	var cipher_list = [];
	var new_abc_lst = make_new_abc(keyword);
	
	function transfer(lst, output) {
		if (is_empty_list(lst)) {
			return output;
		} else if (is_alpha(head(lst))) {
			var shift = find_position(head(lst), 1, new_abc_lst);
			return transfer(tail(lst), append(output, list(get_char(shift, 1, abc_lst))));
		} else {
			return transfer(tail(lst), append(output, list(head(lst))));
		}
	}
	return list_to_string_without_brackets(transfer(original_list, cipher_list));

}
// Test your functions
display(mixed_encrypt("zebras", "flee at once. we are discovered!"));
display(mixed_decrypt("zebras", mixed_encrypt("zebras", "flee at once. we are discovered!")));