var min = $('minutes');
var seconds = document.getElementById('seconds');
var setMinutes = document.getElementById('set-minutes');
var setSeconds = document.getElementById('set-seconds');
var form = $('#set-timer');


console.log('Lets play');

form.on('submit', function(e) {
	e.preventDefault();
	console.log(randomAction());
	setTimer();
})

/* Set the timer value to the current input timer values.
 * If the user has no input a value for one of seconds/minutes, default it to double 0.
 * If the seconds field value is less than 10, left pad a 0 to the innerHTML of the timer. 
 */
function setTimer() {
	if (!setSeconds.value) {
		seconds.innerHTML = "00";
	} else if (setSeconds.value.length < 2) {
		seconds.innerHTML = "0" + setSeconds.value;
	} else {
		seconds.innerHTML = setSeconds.value;
	}

	if (!setMinutes.value) {
		minutes.innerHTML = "00"
	} else if (setMinutes.value.length < 2) {
		minutes.innerHTML = "0" + setMinutes.value;
	} else {
		minutes.innerHTML = setMinutes.value;
	}
}

/* Let the bot choose a random action */
function randomAction() {
	actions = {
		0: 'Rock',
		1: 'Paper',
		2: 'Scissors'
	};
	var randomAction = Math.floor(Math.random() * 3);
	return actions[randomAction];
}