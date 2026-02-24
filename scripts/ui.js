/**
 * Handles UI updates and DOM manipulation.
 */

const elements = {
    timerDisplay: document.getElementById('timer'),
    startButton: document.getElementById('start'),
    pauseButton: document.getElementById('pause'),
    resetButton: document.getElementById('reset'),
    modeButtons: document.querySelectorAll('.mode-btn'),
};

/**
 * Formats seconds into HH:MM:SS string.
 * @param {number} seconds 
 * @returns {string} Formatted time string
 */
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    return [
        h.toString().padStart(2, '0'),
        m.toString().padStart(2, '0'),
        s.toString().padStart(2, '0')
    ].join(':');
}

/**
 * Updates the timer display with the formatted time.
 * @param {number} seconds 
 */
export function updateTimerDisplay(seconds) {
    elements.timerDisplay.textContent = formatTime(seconds);
}

/**
 * Updates the state of the control buttons.
 * @param {boolean} isRunning 
 */
export function updateControlsState(isRunning) {
    if (isRunning) {
        elements.startButton.disabled = true;
        elements.pauseButton.disabled = false;
    } else {
        elements.startButton.disabled = false;
        elements.pauseButton.disabled = true;
    }
}

/**
 * Attaches event listeners to buttons.
 * @param {object} handlers - Object containing handler functions for start, pause, reset, modeChange.
 */
export function bindEvents({ onStart, onPause, onReset, onModeChange }) {
    elements.startButton.addEventListener('click', onStart);
    elements.pauseButton.addEventListener('click', onPause);
    elements.resetButton.addEventListener('click', onReset);
    
    elements.modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            onModeChange(mode);
        });
    });
}

/**
 * Updates the active mode button in the UI.
 * @param {string} activeMode 
 */
export function setActiveMode(activeMode) {
    elements.modeButtons.forEach(button => {
        if (button.dataset.mode === activeMode) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Updates the session counter display.
 * @param {number} count 
 * @param {number} total 
 */
export function updateSessionCounter(count, total) {
    elements.sessionCounter.textContent = `Sessions: ${count % total}/${total}`;
}
