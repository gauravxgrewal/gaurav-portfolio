// src/pages/StudentDashboard/StudentDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, CheckCircle, Clock } from 'lucide-react';
import TodayTab from './TodayTab';
import HistoryTab from './HistoryTab';
import { useMantraCounter } from '../../hooks/useMantraCounter';
import Loader from '../../components/Loader';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const {
    beads,
    rounds,
    officialRounds,
    targetRounds,
    todaysSubmissions,
    allSubmissions,
    isLoading,
    isSubmitting,
    incrementBead,
    decrementBead,
    saveProgress,
    resetLocalCounter,
  } = useMantraCounter(currentUser);

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
      <Icon className="w-5 h-5 mr-2 hidden md:block" />
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
      <header className="sticky top-0 z-10 p-4 bg-primary-dark text-amber-100 backdrop-blur-md shadow-sm shadow-amber-100/50">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
             
             <div className="left"> <h1 className="text-xl md:text-2xl font-serif font-bold text-primary-dark">
                Sankalpa   </h1>
              <p className="text-[.8rem]">Welcome, {currentUser?.name || 'Student'} 🙏</p>
         
     </div> 
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-primary-dark bg-amber-100 rounded-md hover:bg-amber-200"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <TabButton id="today" label="Today's Japa" icon={CheckCircle} />
          <TabButton id="history" label="History" icon={Clock} />
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {activeTab === 'today' && (
              <TodayTab
                beads={beads}
                rounds={rounds}
                officialRounds={officialRounds}
                targetRounds={targetRounds}
                todaysSubmissions={todaysSubmissions}
                isSubmitting={isSubmitting}
                incrementBead={incrementBead}
                decrementBead={decrementBead}
                saveProgress={saveProgress}
                resetLocalCounter={resetLocalCounter}
              />
            )}
            {activeTab === 'history' && (
              <HistoryTab submissions={allSubmissions} />
            )}
          </div>
        )}

      
          <div className="w-full flex items-center justify-center mt-4">
            <p className="text-sm text-amber-200">{formattedDate}</p>
</div>
      </main>
    </div>
  );
};

export default StudentDashboard;