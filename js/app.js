var min = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var setMinutes = document.getElementById('set-minutes');
var setSeconds = document.getElementById('set-seconds');
var form = $('#set-timer');


console.log('Lets play');

var Timer = function() {
	var start = $('#set-timer'),
	seconds = document.getElementById('seconds'),
	minutes = document.getElementById('minutes'),
	setMinutes = document.getElementById('set-minutes'),
	setSeconds = document.getElementById('set-seconds'),
	interval;

	function setTimer() {
		clearInterval(interval);
		if (!setSeconds.value) {
			seconds.innerHTML = "00";
		} else if (setSeconds.value.length < 2) {
			seconds.innerHTML = "0" + setSeconds.value;
		} else if (setSeconds.value > 59) {
			seconds.innerHTML = setSeconds.value % 60;
			setMinutes.value = parseInt(setMinutes.value) + Math.floor(setSeconds.value / 60);
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

	function runTimer() {
		interval = setInterval(updateSeconds, 50);
	}

	function updateSeconds() {
		newVal = seconds.innerHTML - 1;
		if (newVal > 9) {
			seconds.innerHTML = newVal;
		} else if (newVal >= 0) {
			seconds.innerHTML = "0" + newVal;
		} else if (newVal < 0) {
			seconds.innerHTML = "59";
			updateMinutes();
		}
	}

	function updateMinutes() {
		newVal = minutes.innerHTML - 1;
		if (newVal > 9) {
			minutes.innerHTML = newVal;
		} else if (newVal >= 0) {
			minutes.innerHTML = "0" + newVal;
		} else if (newVal < 0) {
			clearInterval(interval);
			seconds.innerHTML = minutes.innerHTML = "00";
		}
	}
	this.setTimer = setTimer;	
	this.runTimer = runTimer;
}


var stopwatch = new Timer();

form.on('submit', function(e) {
	e.preventDefault();
	console.log(randomAction());
	stopwatch.setTimer();
	stopwatch.runTimer();
})

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