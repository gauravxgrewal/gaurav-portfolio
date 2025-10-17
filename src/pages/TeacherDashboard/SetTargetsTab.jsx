import React, { useState, useMemo } from 'react';
import { Save, Loader2, Search } from 'lucide-react';

const SetTargetsTab = ({ students, updateTarget }) => {
  const [targets, setTargets] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    if (!searchTerm) {
      return students;
    }
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const handleTargetChange = (studentId, value) => {
    // Ensure only non-negative numbers are set
    const numValue = Math.max(0, Number(value));
    setTargets((prev) => ({
      ...prev,
      [studentId]: numValue,
    }));
  };

  const handleSave = async (studentId) => {
    const newTarget = targets[studentId];
    if (newTarget === undefined || newTarget < 0) return;

    setLoadingStates((prev) => ({ ...prev, [studentId]: true }));
    await updateTarget(studentId, newTarget.toString());
    setLoadingStates((prev) => ({ ...prev, [studentId]: false }));
  };
  
  return (
    <div className="p-2 md:p-4">
      <h2 className="text-2xl font-serif text-gray-800 mb-6">Set Targets</h2>
      
      <div className="max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="student-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a student..."
            className="w-full pl-12 bg-white pr-4 py-3 text-base border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-full"
          />
        </div>

        {/* Student List */}
        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg shadow-sm"
              >
                <div>
                  <span className="font-medium text-gray-800">{student.name}</span>
                  <span className="block text-sm text-gray-500">{student.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 mt-3 md:mt-0">
                  <label htmlFor={`target-${student.id}`} className="text-sm text-gray-600 sr-only">
                    Target:
                  </label>
                  <input
                    id={`target-${student.id}`}
                    type="number"
                    min="0"
                    value={
                      targets[student.id] !== undefined
                        ? targets[student.id]
                        : student.targetRounds
                    }
                    onChange={(e) => handleTargetChange(student.id, e.target.value)}
                    className="w-28 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-center"
                    placeholder="Rounds"
                  />
                  <button
                    onClick={() => handleSave(student.id)}
                    disabled={loadingStates[student.id]}
                    className="flex items-center justify-center w-24 h-9 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingStates[student.id] ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-1.5" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="p-6 text-gray-500 text-center">
              No student found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetTargetsTab;
