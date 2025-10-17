import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { playTickSound, playCompletionSound } from '../utils/sounds';
import { triggerBeadHaptic, triggerRoundHaptic } from '../utils/haptics';

const LOCAL_STORAGE_KEY = 'sankalpaCounter';

// Helper to get today's date as "YYYY-MM-DD"
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Helper to load initial state from localStorage
const loadInitialState = () => {
  const today = getTodayString();
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedState) {
    const item = JSON.parse(storedState);
    // Check for daily reset
    if (item.date === today) {
      return { beads: item.beads, rounds: item.rounds };
    }
  }
  // Default state or if date is stale
  return { beads: 0, rounds: 0 };
};

export const useMantraCounter = (currentUser) => {
  // Use lazy initializer for useState
  const [localCount, setLocalCount] = useState(loadInitialState);

  const [officialSubmissions, setOfficialSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = getTodayString();

  // 1. Fetch official submissions for today
  const fetchTodaysSubmissions = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const submissionsRef = collection(db, 'submissions');
      const q = query(
        submissionsRef,
        where('userId', '==', currentUser.uid),
        where('date', '==', today)
      );

      const querySnapshot = await getDocs(q);
      const submissions = [];
      querySnapshot.forEach((doc) => {
        submissions.push({ id: doc.id, ...doc.data() });
      });

      setOfficialSubmissions(submissions);
    } catch (error) {
      console.error('Error fetching submissions: ', error);
      toast.error("Could not fetch today's progress.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch all submissions for history
  const fetchAllSubmissions = async () => {
    if (!currentUser) return;
    try {
      const submissionsRef = collection(db, 'submissions');
      const q = query(
        submissionsRef,
        where('userId', '==', currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const submissions = [];
      querySnapshot.forEach((doc) => {
        submissions.push({ id: doc.id, ...doc.data() });
      });

      setAllSubmissions(submissions);
    } catch (error) {
      console.error('Error fetching all history: ', error);
    }
  };

  // 3. Load Firestore data on mount
  useEffect(() => {
    if (currentUser) {
      fetchTodaysSubmissions();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchAllSubmissions();
    }
  }, [currentUser]);

  // 4. Save to localStorage whenever localCount changes
  useEffect(() => {
    const stateToSave = {
      ...localCount,
      date: today,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [localCount, today]);

  // 5. Memoized value for total official rounds today
  const officialRounds = useMemo(() => {
    return officialSubmissions.reduce((sum, sub) => sum + sub.rounds, 0);
  }, [officialSubmissions]);

  // 6. Counter logic
  const incrementBead = () => {
    setLocalCount((prev) => {
      let newBeads = prev.beads + 1;
      let newRounds = prev.rounds;

      if (newBeads === 108) {
        newBeads = 0;
        newRounds += 1;
        playCompletionSound();
        triggerRoundHaptic();
      } else {
        playTickSound();
        triggerBeadHaptic();
      }

      return { beads: newBeads, rounds: newRounds };
    });
  };

  const decrementBead = () => {
    setLocalCount((prev) => {
      let newBeads = prev.beads - 1;
      let newRounds = prev.rounds;

      if (newBeads < 0) {
        if (newRounds > 0) {
          newBeads = 107;
          newRounds -= 1;
        } else {
          newBeads = 0;
        }
      }

      return { beads: newBeads, rounds: newRounds };
    });
  };

  // 7. Save Progress to Firestore
  const saveProgress = async () => {
    setIsSubmitting(true);
    const newRoundsToSubmit = localCount.rounds - officialRounds;

    if (newRoundsToSubmit <= 0) {
      toast.success('Your progress is already saved!');
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'submissions'), {
        userId: currentUser.uid,
        name: currentUser.name,
        email: currentUser.email,
        rounds: newRoundsToSubmit,
        date: today,
        timestamp: serverTimestamp(),
      });

      toast.success(`Saved ${newRoundsToSubmit} new round(s)!`);
      await fetchTodaysSubmissions();
      await fetchAllSubmissions();
    } catch (error) {
      console.error('Error saving progress: ', error);
      toast.error('Failed to save progress.');
    } finally {
      setIsSubmitting(false);
    }
  };

// 8. Reset Local Counter
const resetLocalCounter = () => {
  setLocalCount({ beads: 0, rounds: 0 });
  toast.success('Local progress has been reset.');
};


  return {
    beads: localCount.beads,
    rounds: localCount.rounds,
    officialRounds,
    targetRounds: currentUser.targetRounds || 0,
    todaysSubmissions: officialSubmissions,
    allSubmissions: allSubmissions,
    isLoading,
    isSubmitting,
    incrementBead,
    decrementBead,
    saveProgress,
    resetLocalCounter, // <-- Naya function yahan return kiya
  };
};