var form = $('#set-timer');
var play = $('#play');
var pause = $('#pause');
var reset = $('#reset');

// Timer object constructor, used to manage the time/stopwatch for the game
var Timer = function(endCallback) {
	var seconds = document.getElementById('seconds'),
	minutes = document.getElementById('minutes'),
	setMinutes = document.getElementById('set-minutes'),
	setSeconds = document.getElementById('set-seconds'),
	endCallback = endCallback || null,
	interval;

	// Set the timer's initial values based on the current inputs
	function setTimer() {
		clearInterval(interval);
		if (!setSeconds.value) {
			secondsVal = 0;
			seconds.innerHTML = "00";
		} else if (setSeconds.value.length < 2) {
			seconds.Val
			seconds.innerHTML = "0" + setSeconds.value;
		} else if (setSeconds.value > 59) {
			seconds.innerHTML = setSeconds.value > 69 ? setSeconds.value % 60 : "0" + setSeconds.value;
			setMinutes.value = setMinutes.value ? parseInt(setMinutes.value) + Math.floor(setSeconds.value / 60) : Math.floor(setSeconds.value/60);
			console.log(setMinutes.value);
			setSeconds.value = setSeconds.value % 60;
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

	// Start running the timer (updates every second);
	function runTimer() {
		interval = setInterval(updateSeconds, 1000);
	}

	function stopTimer() {
		clearInterval(interval);
	}

	// Updates the second counter for the timer, if seconds reaches 0 then reset to 59 and decrement the minute count.
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

	// Updates the minute counter for the timer, if minutes attempts set minutes below 0, then set the seconds/minutes to 0 and stop the timer
	function updateMinutes() {
		newVal = minutes.innerHTML - 1;
		if (newVal > 9) {
			minutes.innerHTML = newVal;
		} else if (newVal >= 0) {
			minutes.innerHTML = "0" + newVal;
		} else if (newVal < 0) {
			clearInterval(interval);
			seconds.innerHTML = minutes.innerHTML = "00";
			if (endCallback && typeof endCallback == "function") endCallback();
		}
	}

	function setEndCallback(callback) {
		endCallback = callback;
	}
	//public methods, set the timer, and run/start the timer
	this.setTimer = setTimer;	
	this.runTimer = runTimer;
	this.stopTimer = stopTimer;
	this.setEndCallback = setEndCallback;
}

var Game = function() {
	var wins = document.getElementById('win'),
		losses = document.getElementById('loss'),
		ties = document.getElementById('tie'),	
		playerAction = document.getElementById('player-action'),
		botAction = document.getElementById('bot-action'),
		possibleActions = document.querySelectorAll('li'), // Rock, Paper, Scissors
		boundActions = [];
		stopwatch =  new Timer(findWinner);

	function randomAction() {
		var actions = {
			0: 'rock',
			1: 'paper',
			2: 'scissors'
		};
		var action = Math.floor(Math.random() * 3);
		return actions[action];
	}

	function takeAction(action) {
		var playerMove = this.innerHTML.toLowerCase();
		var botMove = randomAction();
		updateScore(playerMove, botMove);
		playerAction.src = "img/" + playerMove + ".jpg";
		botAction.src = "img/" + botMove + ".jpg";
	}

	function enableActions() {
		for (var i = 0; i < possibleActions.length; i++) {
			var handler = takeAction.bind(possibleActions[i]);
			boundActions.push(handler);
			possibleActions[i].addEventListener('click', handler)
		}
		stopwatch.setTimer();
		stopwatch.runTimer(findWinner);
		console.log(this);
	}

	function disableActions() {
		stopwatch.stopTimer();
		console.log("what");
		for (var i = 0; i < possibleActions.length; i++) {
			possibleActions[i].removeEventListener('click', boundActions[i]);
		}
		boundActions = [];
	}

	function findWinner() {
		console.log('SOMEONE WON THE GAME...');
	}

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

	this.enableActions = enableActions;
	this.disableActions = disableActions;
}

var roShamBo = new Game();

form.on('submit', function(e) {
	e.preventDefault();
	//stopwatch.setTimer();
	//stopwatch.runTimer();
	roShamBo.enableActions();
});

play.on('click', function(e) {
	roShamBo.enableActions();
});

pause.on('click', function(e) {
	roShamBo.disableActions();
})

reset.on('click', function(e) {
	roShamBo.disableActions();
})