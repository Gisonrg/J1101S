function RSA_encrypt(string, public_key) {
    return map(function(int) {
        return bigInt_to_int(RSA_transform(int_to_bigInt(int), public_key));
    }, string_to_intlist(string));
}

// (a)

function RSA_decrypt(intlist, private_key) {
    // Your code here!
    return intlist_to_string(map(function(int) {
        return bigInt_to_int(RSA_transform(int_to_bigInt(int), private_key));
    }, intlist));
}

// Test your newly written RSA_decryption function
var test_public_key1 = key_pair_public(test_key_pair1);
var test_result = RSA_encrypt("Hello World!", test_public_key1);
var test_private_key1 = key_pair_private(test_key_pair1);
display(RSA_decrypt(test_result, test_private_key1));

// Did you get back "Testing RSA_decrypt..."?
//No, but I get "Hello World!"!!!

// (b)
// Question: Why is this simple scheme inadequate for secure encryption?
// Answer: Your answer here!
/* 
  Although this method is relatively simple, but it is not safe enough because it may
  leak your original information. We divide the original text into 4 chars per block 
  in order to encrypt them. But what if there is another repeated 4 chars which is in
  the same block? It will show the same encrypted results as the previous one.
  For example: 
  If you try "RSA_encrypt("test or test", test_public_key1);" It will give you
  the list "[176978291, [270612309, [176978291, []]]]", you can see that there are
  two same number(which represent "test" after encrypted by the public key). 
  The hacker will know that these are two same text, and hence guess the original text 
  by simply tring different 4-char combination without knowing the private key.
  Compared with the standard method, the hacker can not find any pattern related to 
  the original text, and the only way to find out the original text is to get the 
  private key or find two prime numbers p,q to get the private key d. While 
  the the second one is almost impossible as long as p,q is big enough. 
  What's more, even if the hacker got the private key, as long as he doesn't know 
  how we encrypt the text, he cannot use the private key to get the original text, but
  he could do so easily when we use the simple method.
*/

// TASK 2

// The original function definitions

function RSA_encrypt(string, key1) {
    return RSA_convert_list(string_to_intlist(string), key1);
}

function RSA_decrypt(intlist, key2) {
    return intlist_to_string(RSA_unconvert_list(intlist, key2));
}

// Your solution

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


// Check your function by evaluating
var test_public_key1 = key_pair_public(test_key_pair1);
var result1 = RSA_encrypt("I love CS1101S", test_public_key1);
var test_private_key1 = key_pair_private(test_key_pair1);

display(RSA_unconvert_list(result1, test_private_key1));
// Result: "[234557513, [141046518, [101472467, [67643825, []]]]]"

// Now evaluate
display(RSA_decrypt(result1, test_private_key1));

// Did you get back your test message?
// Result: "I love CS1101S"