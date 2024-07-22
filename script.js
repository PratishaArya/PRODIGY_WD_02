let startTime; 
let elapsedTime = 0; 
let timerInterval; 
let laps = []; 

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function printTime() {
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            printTime();
        }, 10); 

        document.querySelector('button:nth-child(1)').textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        startTime = null;
        document.querySelector('button:nth-child(1)').textContent = 'Start';
    }
}

function pause() {
    clearInterval(timerInterval);
    startTime = null;
    document.querySelector('button:nth-child(1)').textContent = 'Resume';
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    printTime();
    document.querySelector('button:nth-child(1)').textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (startTime) {
        let lapTime = elapsedTime;
        laps.unshift(lapTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        lapsList.prepend(lapItem);
    }
}
