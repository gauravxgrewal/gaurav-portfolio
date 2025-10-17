import React, { useState, useMemo } from 'react';
import { Loader2, CheckCircle, Search, X } from 'lucide-react';

// Helper function to group submissions by date
const groupSubmissionsByDate = (submissions) => {
  return submissions.reduce((acc, sub) => {
    const date = sub.date;
    if (!acc[date]) {
      acc[date] = {
        date: date,
        totalRounds: 0,
        submissions: [],
      };
    }
    acc[date].submissions.push(sub);
    acc[date].totalRounds += sub.rounds;
    return acc;
  }, {});
};

// A more robust date formatting function to avoid timezone issues
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

const formatTime = (timestamp) => {
  if (!timestamp || typeof timestamp.toDate !== 'function') return '...';
  return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const StudentHistoryTab = ({ students, fetchHistory }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on search term. Show all if search is empty.
  const filteredStudents = useMemo(() => {
    if (!students) return [];
    if (!searchTerm) {
      return students;
    }
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const handleSelectStudent = async (student) => {
    setSelectedStudent(student);
    setSearchTerm(''); // Clear search term after selection
    setHistory([]);

    if (!student) return;

    setLoading(true);
    const historyData = await fetchHistory(student.id);
    setHistory(historyData);
    setLoading(false);
  };
  
  const handleClearSelection = () => {
      setSelectedStudent(null);
      setHistory([]);
      setSearchTerm('');
  }

  // Memoize the grouped history
  const groupedHistory = useMemo(() => {
    const grouped = groupSubmissionsByDate(history);
    return Object.values(grouped).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [history]);

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-2xl font-serif text-gray-800 mb-6">
        Student Submission History
      </h2>

      {!selectedStudent ? (
        <div className="max-w-xl mx-auto">
         
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="student-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name to filter list..."
              className="w-full pl-12 bg-white pr-4 py-3 text-base border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-full"
            />
          </div>
          <div className="bg-white border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {filteredStudents.length > 0 ? (
              <ul>
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className="px-5 py-5 cursor-pointer hover:bg-primary-light transition-colors duration-150 border-b last:border-b-0"
                  >
                    {student.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-6 text-gray-500 text-center">
                {searchTerm ? 'No student found.' : 'No students to display.'}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
             <h3 className="text-xl font-semibold text-gray-800">
                Showing history for : <span className="text-primary">{selectedStudent.name}</span>
            </h3>
            <button 
                onClick={handleClearSelection}
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
                <X className="w-4 h-4 mr-2"/>
                Change Student
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {groupedHistory.length === 0 && (
                <p className="text-gray-600 text-center py-8">No submission history found for this student.</p>
              )}
              {groupedHistory.map((group) => (
                <DateGroup key={group.date} group={group} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DateGroup = ({ group }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-200">
        <h3 className="text-lg font-bold font-serif text-primary-dark">
          {formatDate(group.date)}
        </h3>
        <p className="text-sm font-medium text-gray-700 mt-1">
          Total Rounds: <span className="font-bold">{group.totalRounds}</span>
        </p>
      </div>

      <ul className="p-4 space-y-4">
        {group.submissions.map((sub) => (
          <li key={sub.id} className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4">
            <div className="flex-shrink-0">
              <span className="h-9 w-9 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-md text-gray-800">
                Saved <span className="font-bold">{sub.rounds} round(s)</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 font-mono justify-self-end">
              {formatTime(sub.timestamp)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentHistoryTab;

