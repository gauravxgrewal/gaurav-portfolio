// src/pages/StudentDashboard/HistoryTab.jsx
import React, { useMemo } from 'react';
import { CheckCircle } from 'lucide-react';

// Helper function to group submissions by date
const groupSubmissionsByDate = (submissions) => {
    return submissions.reduce((acc, sub) => {
        const date = sub.date; // 'YYYY-MM-DD' string
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

const HistoryTab = ({ submissions }) => {
    // Memoize the grouped history
    const groupedHistory = useMemo(() => {
        const grouped = groupSubmissionsByDate(submissions);
        // Sort groups by date, newest first
        return Object.values(grouped).sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }, [submissions]);

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-serif text-gray-800 mb-4">
                Full Submission History
            </h2>
            {groupedHistory.length === 0 ? (
                <p className="text-gray-600">You haven't saved any rounds yet.</p>
            ) : (
                groupedHistory.map((group) => (
                    <DateGroup key={group.date} group={group} />
                ))
            )}
        </div>
    );
};

// Naya component ek din ka group render karne ke liye
const DateGroup = ({ group }) => {
    // Format 'YYYY-MM-DD' string
    const formatDate = (dateString) => {
        // T00:00:00 add karna zaroori hai timezone issues se bachne ke liye
        return new Date(dateString + 'T00:00:00').toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Format Firebase timestamp object
    const formatTime = (timestamp) => {
        if (!timestamp) return '...'; // Agar timestamp abhi save ho raha hai
        return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Din ke andar submissions ko sort karo (newest first)
    const sortedSubmissions = [...group.submissions].sort(
        (a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis()
    );

    return (
        <div className="relative">
            {/* Date Header (Sticky) */}
            <div className="sticky top-16 z-10 bg-white/70 backdrop-blur-md p-4">
                <h3 className="text-lg font-bold font-serif text-primary-dark">
                    {formatDate(group.date)}
                </h3>
                <p className="text-sm font-medium text-gray-700">
                    Total Rounds: {group.totalRounds}
                </p>
                {/* Submissions List (Timeline) */}
                <ul className="mt-5">
                    {sortedSubmissions.map((sub, index) => (
                        <li key={sub.id}>
                            <div className="relative pb-8">
                                {/* Connecting line */}
                                {index !== sortedSubmissions.length - 1 && (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                )}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center ring-8 ring-white">
                                            <CheckCircle className="h-5 w-5 text-success" />
                                        </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="text-md text-gray-800">
                                                Saved{' '}
                                                <span className="font-bold">
                                                    {sub.rounds} round(s)
                                                </span>
                                            </p>
                                        </div>
                                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime={sub.timestamp?.toDate().toISOString()}>
                                                {formatTime(sub.timestamp)}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );
};

export default HistoryTab;