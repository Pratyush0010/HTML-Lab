// Stopwatch variables
let seconds = 0;
let milliseconds = 0;
let timerInterval = null;
let isRunning = false; // Track if timer is running
let laps = []; // Store lap times

// Function to display in HH:MM:SS:MS format
function updateDisplay() {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    const ms = milliseconds.toString().padStart(2, '0').slice(0, 2);

    document.getElementById('time-display').textContent = `${hrs}:${mins}:${secs}:${ms}`;
}

// Function to add a new lap
function addLap() {
    if (!isRunning) return; // Only allow lap when timer is running

    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    const ms = milliseconds.toString().padStart(2, '0').slice(0, 2);

    const lapTime = `${hrs}:${mins}:${secs}:${ms}`;
    laps.push(lapTime);

    // Create a new lap entry
    const lapElement = document.createElement('div');
    lapElement.className = 'lap-entry';
    lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;

    // Append to a lap container (create if not exists)
    let lapContainer = document.getElementById('lap-container');
    if (!lapContainer) {
        lapContainer = document.createElement('div');
        lapContainer.id = 'lap-container';
        document.querySelector('.stopwatch-container').appendChild(lapContainer);
    }

    lapContainer.appendChild(lapElement);
}

// Start button
document.getElementById("start-btn").addEventListener("click", function () {
    if (timerInterval === null) {
        isRunning = true;
        timerInterval = setInterval(function () {
            milliseconds += 10;
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }
            updateDisplay();
        }, 10);
    }
});

// Stop button
document.getElementById("stop-btn").addEventListener("click", function () {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
    }
});

// Reset button
document.getElementById("reset-btn").addEventListener("click", function () {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
    }
    seconds = 0;
    milliseconds = 0;
    laps = [];
    updateDisplay();

    // Clear all laps from display
    const lapContainer = document.getElementById('lap-container');
    if (lapContainer) {
        lapContainer.innerHTML = '';
    }
});

// Lap button
document.getElementById("lap-btn").addEventListener("click", function () {
    addLap();
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
        seconds = 0;
    }
    updateDisplay();
});

// Initial display
updateDisplay();