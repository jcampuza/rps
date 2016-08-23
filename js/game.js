/* Game logic for RoShamBo/Rock Paper Scissors */
var clickEvent = ((document.ontouchstart!==null)?'click':'touchstart');
console.log(clickEvent)
var Game = function() {
	var wins = document.getElementById('win'),
		losses = document.getElementById('loss'),
		ties = document.getElementById('tie'),	
		playerAction = document.getElementById('player-action'),
		botAction = document.getElementById('bot-action'),
		possibleActions = document.querySelectorAll('#action'), // Rock, Paper, Scissors
		resultPopup = $('.result-popup');
		boundActions = [];
		stopwatch =  new Timer(findWinner),
		gameInProgress = false;

	// The bot chooses a random action between rock/paper/scissors, and returns the chosen action
	function randomAction() {
		var actions = {
			0: 'rock',
			1: 'paper',
			2: 'scissors'
		};
		var action = Math.floor(Math.random() * 3);
		return actions[action];
	}

	// User takes an action. The bot takes an action, and then the scoreboard is updated.
	// Also updates the currently displayed actions based on what the bot chose, and what the user
	// chose.
	function takeAction() {
		var playerMove = this.innerHTML.toLowerCase();
		var botMove = randomAction();
		updateScore(playerMove, botMove);
		playerAction.classList.remove('fa-hand-paper-o', 'fa-hand-scissors-o', 'fa-hand-rock-o')
		playerAction.classList.add('fa-hand-' + playerMove + '-o');
		botAction.classList.remove('fa-hand-paper-o', 'fa-hand-scissors-o', 'fa-hand-rock-o')
		botAction.classList.add('fa-hand-' + botMove + '-o');
	}

	// Start the game. Disables all previously bound event listeners, rebinds the event listeners,
	// resets the timer, sets the game to being in progress, sets the timer based on current inputs,
	// starts the timer, and resets the scoreboard. If the timer didn't start, reset the game.
	function startGame() {
		disableActions();
		enableActions();
		stopwatch.reset();
		gameInProgress = true;
		stopwatch.setTimer();
		var gameStarted = stopwatch.runTimer();
		if (!gameStarted) {
			reset();
		}
		updateScore();
	}

	// Resumes a paused game. If the game is not currently in progress instead starts a new game.
	function resumeGame() {
		if (!gameInProgress) {
			startGame();
			return;
		}
		disableActions();
		enableActions();
		stopwatch.runTimer();
	}

	// Bind event listeners to the buttons for the game. This ensures users cannot play the game
	// or inflate the scoreboard before the game starts 
	function enableActions() {
		for (var i = 0; i < possibleActions.length; i++) {
			var handler = takeAction.bind(possibleActions[i]);
			boundActions.push(handler);
			possibleActions[i].addEventListener(clickEvent, handler)
		}
	}

	// Unbinds event listeners for the game. disables user input, and can be used as a pause, or
	// could be changed to delay between subsequent user actions (does not in this case).
	function disableActions() {
		stopwatch.stopTimer();
		for (var i = 0; i < possibleActions.length; i++) {
			possibleActions[i].removeEventListener(clickEvent, boundActions[i]);
		}
		boundActions = [];
	}

	// Small wrapper around the disable actions function
	function pause() {
		disableActions();
	}

	// Reset the game: disables actions, resets the scoreboard, and sets the game in progress to
	// false. If the game is already in progress, resets the time as well
	function reset() {
		disableActions();
		updateScore();
		if (gameInProgress) {
			stopwatch.reset();
		}
		gameInProgress = false;
	}

	// Decides the winner for the game based on the current values of the scoreboard. This is sent
	// as a callback to the running timer so it runs when the timer completes. Also sets the game 
	// in progress to false, and disables actions.
	// local function displayResult displays a popup based on the results of the game
	function findWinner() {
		gameInProgress = false;
		disableActions();
		var winTotal = parseInt(wins.innerHTML),
			lossTotal = parseInt(losses.innerHTML);

		var displayResult = function(result) {
			resultPopup.html('<label>' + result + '</label>');
			resultPopup.css('background-color', '#35b197')
			resultPopup.show(500);
			setTimeout(function() {
				resultPopup.fadeOut();
			}, 3000)
		}

		if (winTotal > lossTotal) {
			displayResult('YOU WIN! :D');
		} else if (winTotal == lossTotal) {
			displayResult('YOU TIED :|');
		} else {
			displayResult('YOU LOST... :(');
		}
	}

	// Updates the score for the game. Takes optional arguments.
	// With no arguments provided this function simply zeros the scoreboard.
	// With arguments provided, it updates the current values of the scoreboard based on the provided
	// actions taken. arguments[0] = player action, argument[1] = bot action
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

	// Public methods
	this.startGame = startGame;
	this.resumeGame = resumeGame;
	this.pauseGame = pause;
	this.resetGame = reset;
}