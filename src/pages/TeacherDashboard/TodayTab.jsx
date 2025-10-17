import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, RefreshCw, Phone, Search, Clock } from 'lucide-react';

const TodayTab = ({ todayProgress, refreshData }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProgress = useMemo(() => {
    let students = todayProgress || [];

    if (searchTerm) {
      students = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'completed') return students.filter((s) => s.isTargetMet);
    if (filter === 'pending') return students.filter((s) => !s.isTargetMet && !s.hasSubmitted);
    if (filter === 'submitted') return students.filter((s) => !s.isTargetMet && s.hasSubmitted);
    
    return students;
  }, [todayProgress, filter, searchTerm]);

  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-serif text-gray-800">
          Today's Student Progress
        </h2>
        <button
          onClick={refreshData}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-dark bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors duration-200 shadow-sm self-start md:self-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student name..."
            className="w-full pl-10 pr-4 py-4 bg-white text-base border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-full"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <FilterButton id="all" label="All" filter={filter} setFilter={setFilter} />
          <FilterButton id="completed" label="Completed" filter={filter} setFilter={setFilter} />
          <FilterButton id="submitted" label="In Progress" filter={filter} setFilter={setFilter} />
          <FilterButton id="pending" label="Pending" filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* Progress Cards */}
      {filteredProgress.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgress.map((student) => (
            <StudentProgressCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No students match the current filters.</p>
        </div>
      )}
    </div>
  );
};

const StudentProgressCard = ({ student }) => {
    const progressPercentage = student.targetRounds > 0 ? (student.totalRounds / student.targetRounds) * 100 : 0;

    const getStatus = () => {
        if (student.isTargetMet) {
            return {
                text: 'Completed',
                icon: <CheckCircle className="w-4 h-4 mr-1.5" />,
                className: 'bg-success/10 text-success',
            };
        }
        if (student.hasSubmitted) {
            return {
                text: 'In Progress',
                icon: <Clock className="w-4 h-4 mr-1.5" />,
                className: 'bg-blue-100 text-blue-700',
            };
        }
        return {
            text: 'Pending',
            icon: <XCircle className="w-4 h-4 mr-1.5" />,
            className: 'bg-warning/10 text-warning',
        };
    };

    const status = getStatus();

    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                        {status.icon}
                        {status.text}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-primary">{student.totalRounds} Rounds</span>
                        <span className="text-sm font-medium text-gray-500">{student.targetRounds} Target</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {student.phone ? (
                    <a
                        href={`tel:${student.phone}`}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-dark bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                        title={`Call ${student.name}`}
                    >
                        <Phone className="w-4 h-4 mr-2" />
                        {student.phone}
                    </a>
                ) : (
                    <div className="text-center text-xs text-gray-400 py-2">
                        No phone number available
                    </div>
                )}
            </div>
        </div>
    );
};

const FilterButton = ({ id, label, filter, setFilter }) => (
  <button
    onClick={() => setFilter(id)}
    className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-200
      ${
        filter === id
          ? 'bg-primary-dark text-white shadow'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
  >
    {label}
  </button>
);

export default TodayTab;
