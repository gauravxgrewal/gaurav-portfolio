// src/utils/sounds.js

// Place these files in your /public/sounds/ directory
const tickSound = new Audio('/sounds/bead-tick.mp3');
const completionSound = new Audio('/sounds/round-complete.mp3');

// Set volumes (optional)
tickSound.volume = 0.5;
completionSound.volume = 0.7;

export const playTickSound = () => {
  try {
    tickSound.currentTime = 0; // Rewind to start
    tickSound.play();
  } catch (error) {
    console.error("Error playing tick sound:", error);
  }
};

export const playCompletionSound = () => {
  try {
    completionSound.currentTime = 0; // Rewind to start
    completionSound.play();
  } catch (error) {
    console.error("Error playing completion sound:", error);
  }
};