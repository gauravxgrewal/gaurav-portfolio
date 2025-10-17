// src/utils/haptics.js

export const triggerBeadHaptic = () => {
  if (window.navigator && window.navigator.vibrate) {
    // 25ms vibration for a single bead
    window.navigator.vibrate(100);
  }
};

export const triggerRoundHaptic = () => {
  if (window.navigator && window.navigator.vibrate) {
    // 400ms vibration for a full round
    window.navigator.vibrate(800);
  }
};