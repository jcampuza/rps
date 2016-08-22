// clickable elements
var form = $('#set-timer');
var play = $('#play');
var pause = $('#pause');
var reset = $('#reset');

// create game object (constructor located in game.js)
var roShamBo = new Game();

// If the user presses enter to submit, start the game by default
form.on('submit', function(e) {
	e.preventDefault();
	//stopwatch.setTimer();
	//stopwatch.runTimer();
	roShamBo.startGame();
});

// When the user clicks play, resume the game if a game is in progress, otherwise Game() starts a new game
play.on('click', function(e) {
	roShamBo.resumeGame();
});

// Pause the game when the user clicks the pause button
pause.on('click', function(e) {
	roShamBo.pauseGame();
})

// Reset the game when the user clicks reset
reset.on('click', function(e) {
	roShamBo.resetGame();
})