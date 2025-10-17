// src/hooks/useTeacherData.js
import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

// Helper to get today's date as "YYYY-MM-DD"
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export const useTeacherData = () => {
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = getTodayString();

  // Fetch all students and today's submissions
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch all users with role 'student'
      const usersQuery = query(collection(db, 'users'), where('role', '==', 'student'));
      const usersSnapshot = await getDocs(usersQuery);
      const studentList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);

      // 2. Fetch all submissions for today
      const submissionsQuery = query(
        collection(db, 'submissions'),
        where('date', '==', today)
      );
      const submissionsSnapshot = await getDocs(submissionsQuery);
      const submissionList = submissionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(submissionList);

    } catch (error) {
      console.error('Error fetching teacher data: ', error);
      toast.error('Failed to load dashboard data. Check console for errors.');
      // This is likely where index errors will appear
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch on mount

  // Memoized data for the "Today" tab
  const todayProgress = useMemo(() => {
    return students.map((student) => {
      // Find all submissions for this student
      const studentSubmissions = submissions.filter(
        (sub) => sub.userId === student.id
      );
      
      // Calculate total rounds
      const totalRounds = studentSubmissions.reduce(
        (sum, sub) => sum + sub.rounds,
        0
      );

      const isTargetMet = totalRounds >= student.targetRounds;

      return {
        ...student,
        totalRounds,
        isTargetMet,
        hasSubmitted: studentSubmissions.length > 0,
      };
    });
  }, [students, submissions]);

  // Function for the "Set Targets" tab
  const updateStudentTarget = async (studentId, newTarget) => {
    if (newTarget < 0) {
      toast.error('Target cannot be negative.');
      return;
    }
    try {
      const studentDocRef = doc(db, 'users', studentId);
      await updateDoc(studentDocRef, {
        targetRounds: Number(newTarget),
      });

      // Update local state to reflect change
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === studentId ? { ...s, targetRounds: Number(newTarget) } : s
        )
      );
      toast.success('Target updated successfully!');
    } catch (error) {
      console.error('Error updating target: ', error);
      toast.error('Failed to update target.');
    }
  };

  // Function for the "Student History" tab
  const fetchStudentHistory = async (studentId) => {
    try {
      const historyQuery = query(
        collection(db, 'submissions'),
        where('userId', '==', studentId),
        orderBy('timestamp', 'desc')
      );
      const historySnapshot = await getDocs(historyQuery);
      return historySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching student history: ', error);
      toast.error('Failed to fetch student history.');
      return [];
    }
  };

  return {
    loading,
    students, // Raw student list
    todayProgress, // Merged data for Today tab
    fetchData, // To allow manual refresh
    updateStudentTarget,
    fetchStudentHistory,
  };
};