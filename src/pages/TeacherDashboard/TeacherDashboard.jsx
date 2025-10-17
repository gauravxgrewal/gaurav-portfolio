// src/pages/TeacherDashboard/TeacherDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, List, Users, Clock, Settings } from 'lucide-react';
import { useTeacherData } from '../../hooks/useTeacherData';
import Loader from '../../components/Loader';
import TodayTab from './TodayTab';
import StudentHistoryTab from './StudentHistoryTab';
import SetTargetsTab from './SetTargetsTab';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  // --- FIX 1: currentUser ko yahan add kiya ---
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Use the new hook
  const {
    loading,
    students,
    todayProgress,
    fetchData,
    updateStudentTarget,
    fetchStudentHistory,
  } = useTeacherData();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex justify-center items-center p-4 font-medium transition-all duration-300
        ${
          activeTab === id
            ? 'text-primary-dark border-b-2 border-primary-dark'
            : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      <Icon className="w-5 h-5 mr-2 hidden md:inline-block" />
      {label}
    </button>
  );

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date().toLocaleDateString(undefined, dateOptions);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 p-3 bg-primary-dark  shadow-sm shadow-amber-100/50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* --- FIX 2: Header ka structure theek kiya aur date add ki --- */}
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-amber-100">
              Welcome, {currentUser?.name || 'Teacher'}
            </h1>
            <p className="text-sm text-amber-200 ml-5 ">{formattedDate}</p>
          </div>
          {/* ----------------------------------------------------------- */}

          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-primary-dark bg-amber-100 rounded-md hover:bg-amber-200"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200  mb-6">
          <TabButton id="today" label="Today's Progress" icon={List} />
          <TabButton id="history" label="Student History" icon={Clock} />
          <TabButton id="targets" label="Set Targets" icon={Settings} />
        </div>

        {/* Tab Content */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {activeTab === 'today' && (
              <TodayTab todayProgress={todayProgress} refreshData={fetchData} />
            )}
            {activeTab === 'history' && (
              <StudentHistoryTab
                students={students}
                fetchHistory={fetchStudentHistory}
              />
            )}
            {activeTab === 'targets' && (
              <SetTargetsTab
                students={students}
                updateTarget={updateStudentTarget}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;