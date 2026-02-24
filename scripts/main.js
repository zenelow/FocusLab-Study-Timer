import Timer from './timer.js';
import * as UI from './ui.js';

// Configuration
const MODES = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

const SESSIONS_UNTIL_LONG_BREAK = 5;

let currentMode = 'focus';
let completedSessions = 0;

// Initialize Timer
const timer = new Timer(
    MODES[currentMode],
    (remainingTime) => {
        UI.updateTimerDisplay(remainingTime);
    },
    () => {
        handleTimerFinish();
    }
);

// Event Handlers
const handleStart = () => {
    timer.start();
    UI.updateControlsState(true);
};

const handlePause = () => {
    timer.pause();
    UI.updateControlsState(false);
};

const handleReset = () => {
    timer.reset();
    UI.updateControlsState(false);
};

const handleModeChange = (mode) => {
    if (currentMode === mode) return;
    
    currentMode = mode;
    timer.setDuration(MODES[mode]);
    UI.setActiveMode(mode);
    UI.updateControlsState(false);
};

const handleTimerFinish = () => {
    UI.updateControlsState(false);
    
    if (currentMode === 'focus') {
        completedSessions++;
        UI.updateSessionCounter(completedSessions, SESSIONS_UNTIL_LONG_BREAK);
        
        if (completedSessions % SESSIONS_UNTIL_LONG_BREAK === 0) {
            handleModeChange('long');
        } else {
            handleModeChange('short');
        }
    } else {
        // After any break, switch back to focus
        handleModeChange('focus');
    }
    
    alert('Time is up!');
};

// Initialize App
function init() {
    // Set initial display
    UI.updateTimerDisplay(MODES[currentMode]);
    UI.setActiveMode(currentMode);
    UI.updateSessionCounter(completedSessions, SESSIONS_UNTIL_LONG_BREAK);
    UI.updateControlsState(false);

    // Bind events
    UI.bindEvents({
        onStart: handleStart,
        onPause: handlePause,
        onReset: handleReset,
        onModeChange: handleModeChange
    });
}

// Start the application
init();
