// src/pages/StudentDashboard/TodayTab.jsx
import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  Save,
  Loader2,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

const TodayTab = ({
  beads,
  rounds,
  officialRounds,
  targetRounds,
  isSubmitting,
  incrementBead,
  decrementBead,
  saveProgress,
  resetLocalCounter, // optional now
}) => {
  const [showResetModal, setShowResetModal] = useState(false);

  const completionPercent =
    targetRounds > 0 ? (officialRounds / targetRounds) * 100 : 0;
  const isTargetMet = officialRounds >= targetRounds;

  // Internal fallback reset implementation
  const fallbackReset = () => {
    try {
      // adjust keys here to match what your app uses
      localStorage.removeItem('beads');
      localStorage.removeItem('rounds');
      localStorage.removeItem('officialRounds'); // optional if you store it locally
      // dispatch a DOM event so parent/container can listen and update state if it wants
      window.dispatchEvent(new CustomEvent('localProgressReset', { detail: { time: Date.now() } }));
      console.log('Local progress cleared by TodayTab fallback.');
    } catch (err) {
      console.error('Failed to clear local storage:', err);
    }
  };

  const handleConfirmReset = () => {
    // If prop exists and is a function, call it. Otherwise use fallback.
    if (typeof resetLocalCounter === 'function') {
      try {
        resetLocalCounter();
      } catch (err) {
        console.error('resetLocalCounter threw an error, falling back:', err);
        fallbackReset();
      }
    } else {
      fallbackReset();
    }
    setShowResetModal(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 relative">
      {/* Target Info */}
      <div
        className={`w-full p-4 rounded-lg text-center font-serif text-lg
          ${isTargetMet ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary-dark'}`}
      >
        {isTargetMet ? (
          <span className="flex items-center justify-center">
            <Check className="w-5 h-5 mr-2" />
            Target Met!
          </span>
        ) : (
          "Today's Target"
        )}
        <span className="block text-3xl font-bold font-sans">
          {officialRounds} / {targetRounds}
        </span>
        <span className="text-sm font-sans">Official Rounds Completed</span>
      </div>

      {/* Counter UI */}
      <div className="flex items-center justify-center gap-4 w-full">
        <button
          onClick={decrementBead}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/70 shadow-lg shadow-amber-100/50 backdrop-blur-md text-primary-dark active:scale-90 transition-transform"
        >
          <ChevronDown className="w-5 h-5 mx-auto" />
        </button>

        <div
          onClick={incrementBead}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-xl shadow-primary/30 text-white flex flex-col justify-center items-center cursor-pointer select-none active:scale-95 transition-transform"
        >
          <span className="text-6xl md:text-8xl font-bold font-sans">
            {beads}
          </span>
          <span className="text-xl md:text-2xl opacity-80">Beads</span>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="flex justify-center items-center w-10 h-10 rounded-full text-red-600 bg-red-100 hover:bg-red-200 active:scale-95 transition"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Local Rounds Display */}
      <div className="text-center">
        <span className="text-5xl font-bold font-serif text-gray-800">
          {rounds}
        </span>
        <span className="block text-lg text-gray-600">Total Local Rounds</span>
      </div>

      {/* Save Button */}
      <button
        onClick={saveProgress}
        disabled={isSubmitting || rounds <= officialRounds}
        className="w-full max-w-xs flex justify-center items-center gap-2 py-4 px-6 bg-success text-white font-bold rounded-lg shadow-lg shadow-success/30 transition-all hover:shadow-xl hover:shadow-success/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Progress
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center -mt-4">
        {rounds > officialRounds
          ? `Click to save ${rounds - officialRounds} new round(s)`
          : 'Save your progress to official records'}
      </p>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
            <div className="flex justify-center mb-4 text-red-500">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2">Reset Progress?</h2>
            <p className="text-gray-600 mb-6">
              This will clear your local beads and rounds. Are you sure?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayTab;
