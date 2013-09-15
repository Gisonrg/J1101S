// Task 1

function simple_echo(sound, distance) {
	var dis = distance;
	var minimum_gain = 0.01;

	function delay(distance) {
		return silence(distance / speed_of_sound);
	}

	function factor(d) {
		return Math.pow(dis / (2 * d), 2);
	}

	function intensity(distance) {
		if (factor(distance) < minimum_gain) {
			return empty_sound;
		} else {
			return sequence(sequence(delay(dis), gain(factor(distance), sound)), intensity(distance + dis));
		}
	}
	return sequence(sequence(delay(dis / 2), gain(factor(dis / 2), sound)), intensity(3 / 2 * dis));
}



// play(simple_echo(sound, 100));
// play(gain(100*100/(4*100*100), sound));

// Task 2

function linear_echo(sound, distance, source_position, listener_position) {
	var minimum_gain = 0.01;
	var listener = listener_position;
	var player = source_position;
	var inter = Math.abs(listener - player);

	function delay(distance) {
		return silence(distance / speed_of_sound);
	}

	function factor(d) {
		return Math.pow(Math.abs(source_position - listener_position) / d, 2);
	}

	function intensity(distance, counter, dis_even, dis_odd, base) {
		if (factor(base) < minimum_gain) {
			return empty_sound;
		} else if (counter % 2 === 0) {
			return sequence(sequence(delay(base), gain(factor(base), sound)),
				       intensity(distance, counter + 1, 2 * (distance - listener), 2 * listener, base + dis_even));
		} else {
			return sequence(sequence(delay(base), gain(factor(base), sound)),
				       intensity(distance, counter + 1, 2 * (distance - listener), 2 * listener, base + dis_odd));
		}
	}
	return parallel(intensity(distance, 0, 2 * (distance - listener), 2 * listener, inter),
		       intensity(distance, 0, 2 * (distance - listener), 2 * listener, inter + 2 * player));
}
// play(linear_echo(sound, 100, 25, 75));


function intensity(distance, counter, dis_even, dis_odd, base)
var inter = Math.abs(listener - player);
Player < listner: 正: -1.inter
0.inter + 2 * (distance - listener)
1.inter + 2 * (distance - listener) + 2 * listner
2.inter + 2 * (distance - listener) + 2 * listner + 2 * (distance - listener)
even: 2 * (distance - listener) odd: 2 * listener反: -1.inter + 2 * player
0.inter + 2 * player + 2 * (distance - listener)
1.inter + 2 * player + 2 * (distance - listener) + 2 * listner
even: 2 * (distance - listener) odd: 2 * listener

intensity(distance, 0, 2 * (distance - listener), 2 * listener, inter)
intensity(distance, 0, 2 * (distance - listener), 2 * listener, inter + 2 * player)

function intensity(distance, counter, dis_even, dis_odd, base) {
	if (factor(distance) < minimum_gain) {
		return empty_sound;
	} else if (counter % 2 === 0) {
		return sequence(sequence(delay(base), gain(factor(distance), sound)), intensity(distance, counter + 1, 2 * (distance - listener), 2 * listener, base + dis_even));
	} else {
		return sequence(sequence(delay(base), gain(factor(distance), sound)), intensity(distance, counter + 1, 2 * (distance - listener), 2 * listener, base + dis_odd));
	}
}

return parallel(intensity(distance, 0, 2 * (distance - listener), 2 * listener, inter), intensity(distance, 0, 2 * (distance - listener), 2 * listener, inter + 2 * player));



function intensity(distance, counter, dis_even, dis_odd, base)
var inter = Math.abs(listener - player);
listner < Player: 正: 0.inter + 2 * (distance - listener)
1.inter + 2 * (distance - listener) + 2 * listner
2.inter + 2 * (distance - listener) + 2 * listner + 2 * (distance - listener)
even: 2 * (distance - listener) odd: 2 * listener反: -1.inter + 2 * player
0.inter + 2 * player + 2 * (distance - listener)
1.inter + 2 * player + 2 * (distance - listener) + 2 * listner
even: 2 * (distance - listener) odd: 2 * listener