// pages/AttendanceReport.jsx
import React, { useState } from 'react';

const AttendanceReport = () => {
  const [events] = useState([
    {
      id: 1,
      name: 'Science Fair',
      date: '2025-04-25',
      attendees: ['Emma Watson', 'James Wilson', 'Olivia Taylor']
    },
    {
      id: 2,
      name: 'Book Club',
      date: '2025-04-28',
      attendees: ['Emma Watson', 'Michael Brown', 'Sophia Martinez']
    }
  ]);

  const allTutees = ['Emma Watson', 'Michael Brown', 'James Wilson', 'Olivia Taylor', 'Sophia Martinez'];

  const tuteeAttendance = allTutees.map(tutee => {
    const attended = events.filter(e => e.attendees.includes(tutee)).length;
    const rate = (attended / events.length) * 100;
    return { name: tutee, attended, total: events.length, rate };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Report</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Export Report</button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tutee Attendance Overview</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events Attended</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Events</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tuteeAttendance.map((tutee, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{tutee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.attended}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.rate.toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReport;