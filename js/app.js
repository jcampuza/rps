// Option elements (time/play)
var min = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var setMinutes = document.getElementById('set-minutes');
var setSeconds = document.getElementById('set-seconds');
var form = $('#set-timer');

// Player Actions
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');

// Scoreboard Elements
var wins = document.getElementById('win');
var losses = document.getElementById('loss');
var ties = document.getElementById('tie');


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
		interval = setInterval(updateSeconds, 1000);
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
});

/* Let the bot choose a random action */
function randomAction() {
	actions = {
		0: 'rock',
		1: 'paper',
		2: 'scissors'
	};
	var randomAction = Math.floor(Math.random() * 3);
	return actions[randomAction];
}

/* Function to update score, if passed no arguments, will reset the score back to default (0,0,0);
 * otherwise, it takes two arguments, the players action, and bots action. Decides the winner, and 
 * updates the score accordingly
 */
function updateScore() {
	var args = Array.prototype.slice.call(arguments);
	var winValue = parseInt(wins.innerHTML),
	    lossValue = parseInt(losses.innerHTML),
	    tieValue = parseInt(ties.innerHTML);

	// if no arguments, or the arguments are equal, then reset the scoreboard or add 1 to ties
	if (!args.length) {
		wins.innerHTML = "0";
		losses.innerHTML = "0";
		ties.innerHTML = "0";
		return;
	} else if (args[0] == args[1]) {
		ties.innerHTML = tieValue + 1;
		return;
	}

	// Otherwise check arguments for win state
	switch (args[0]) {
		case 'rock':
			args[1] == 'scissors' ? wins.innerHTML = winValue + 1 : losses.innerHTML = lossValue + 1;
			break;
		case 'paper':
			args[1] == 'rock' ? wins.innerHTML = winValue + 1 : losses.innerHTML = lossValue + 1;
			break;
		case 'scissors':
			args[1] == 'paper' ? wins.innerHTML = winValue + 1 : losses.innerHTML = lossValue + 1;
			break;
	}
}

function roShamBo() {
	var els = document.querySelectorAll('li');
	for (var i = 0; i < els.length; i++) {
		els[i].addEventListener('click', function() {
			var playerAction = this.innerHTML.toLowerCase();
			var botAction = randomAction();
			updateScore(playerAction, botAction);
			document.getElementById('player-action').src = "img/" + playerAction + ".jpg";
			document.getElementById('bot-action').src = "img/" + botAction + ".jpg";
		});
	}
}

roShamBo();

