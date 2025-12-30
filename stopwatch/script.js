// Stopwatch variables
let seconds = 0;
let milliseconds = 0;
let timerInterval = null;

// Function to display in HH:MM:SS:MS format
function updateDisplay() {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    const ms = milliseconds.toString().padStart(2, '0').slice(0, 2); // Show only first 2 digits of milliseconds

    document.getElementById('time-display').textContent = `${hrs}:${mins}:${secs}:${ms}`;
}

// Start button
document.getElementById("start-btn").addEventListener("click", function () {
    if (timerInterval === null) {
        timerInterval = setInterval(function () {
            milliseconds += 10;  // Increment by 10ms (100 updates per second)
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }
            updateDisplay();
        }, 10);  // Update every 10 milliseconds
    }
});

// Stop button
document.getElementById("stop-btn").addEventListener("click", function () {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

// Reset button
document.getElementById("reset-btn").addEventListener("click", function () {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
});

// + button
document.getElementById("plus-btn").addEventListener("click", function () {
    seconds += 5;
    updateDisplay();
});

// - button
document.getElementById("minus-btn").addEventListener("click", function () {
    if (seconds >= 5) {
        seconds -= 5;
    } else {
        seconds = 0;//not below 0
    }
    updateDisplay();
});

// Initial display when page loads
updateDisplay();

