/* Separate Timer object to control the timing part of the game. Code for the game logic
 * was separated from the timer, since it is almost like a separate entity
 */
var Timer = function(endCallback) {
	var seconds = document.getElementById('seconds'),
	minutes = document.getElementById('minutes'),
	setMinutes = document.getElementById('set-minutes'),
	setSeconds = document.getElementById('set-seconds'),
	warningPopup = $('.warning-popup') || '',
	endCallback = endCallback || null,
	interval;

	// Set the timer's initial values based on the current user inputs
	function setTimer() {
		clearInterval(interval);
		if (!setSeconds.value) {
			secondsVal = 0;
			seconds.innerHTML = "00";
		} else if (setSeconds.value.length < 2) {
			seconds.innerHTML = "0" + setSeconds.value;
		} else if (setSeconds.value > 59) {
			seconds.innerHTML = setSeconds.value > 69 ? setSeconds.value % 60 : "0" + setSeconds.value % 60;
			setMinutes.value = setMinutes.value ? parseInt(setMinutes.value) + Math.floor(setSeconds.value / 60) : Math.floor(setSeconds.value/60);
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

	// Start running the timer (updates every second). returns true if the timer started.
	// If no values were provided for the timer, returns false to prevent running the timer on
	// a zero value.
	function runTimer() {
		if (!setSeconds.value && !setMinutes.value) {
			return false;
		}
		interval = setInterval(updateSeconds, 1000);
		return true;
	}

	// Pause/stop running the timer (note: DOES NOT RESET THE TIMER, MERELY FREEZES)
	function stopTimer() {
		clearInterval(interval);
	}

	// If the warning popup element exists, then this function will cause it to briefly display
	function showWarning(timeLeft) {
		if (!warningPopup) {
			return;
		} 
		warningPopup.html('<label>' + timeLeft + ' SECONDS LEFT!</label>');
		warningPopup.show();
		setTimeout(function() {
			warningPopup.fadeOut();
		}, timeLeft == 10 ? 1000 : 350)
	}

	// Updates the second counter for the timer, if seconds reaches 0 then reset to 59 and decrement 
	// the minute count.
	function updateSeconds() {
		newVal = seconds.innerHTML - 1;
		if ((newVal == 10 || newVal < 4) && minutes.innerHTML == 0 && newVal > 0) {
			showWarning(newVal);
		}
		if (newVal > 9) {
			seconds.innerHTML = newVal;
		} else if (newVal >= 0) {
			seconds.innerHTML = "0" + newVal;
		} else if (newVal < 0) {
			seconds.innerHTML = "59";
			updateMinutes();
		}
	}

	// Updates the minute counter for the timer, if minutes attempts set minutes below 0, then set 
	// the seconds/minutes to 0, stop the timer, and call the endcallback function if provided
	function updateMinutes() {
		newVal = minutes.innerHTML - 1;
		if (newVal > 9) {
			minutes.innerHTML = newVal;
		} else if (newVal >= 0) {
			minutes.innerHTML = "0" + newVal;
		} else if (newVal < 0) {
			clearInterval(interval);
			seconds.innerHTML = minutes.innerHTML = "00";
			reset();
			if (endCallback && typeof endCallback == "function") endCallback();
		}
	}

	// Used to change the callback to use when the timer completes. didn't end up needing, but it
	// could still prove useful
	function setEndCallback(callback) {
		endCallback = callback;
	}

	// resets the timer, and flips input/display elements (when the user starts the game, the input
	// field is no longer clickable/available to change)
	function reset() {
		$('.timer-set').toggleClass('timer-hide');
		$('.timer-show').toggleClass('timer-hide');
	}

	// public methods
	this.setTimer = setTimer;	
	this.runTimer = runTimer;
	this.stopTimer = stopTimer;
	this.setEndCallback = setEndCallback;
	this.reset = reset;
}