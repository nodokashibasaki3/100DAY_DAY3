import React, { useState } from 'react';

const ClassAttendanceReport = () => {
  const [sessions] = useState([
    {
      id: 1,
      tutor: 'John Smith',
      tutee: 'Emma Watson',
      date: '2025-04-20',
      subject: 'Elementary Math',
      tutorAttended: true,
      tuteeAttended: true
    },
    {
      id: 2,
      tutor: 'Sarah Davis',
      tutee: 'James Wilson',
      date: '2025-04-20',
      subject: 'High School Biology',
      tutorAttended: true,
      tuteeAttended: true
    },
    {
      id: 3,
      tutor: 'Amanda Lee',
      tutee: 'Olivia Taylor',
      date: '2025-04-19',
      subject: 'High School Math',
      tutorAttended: true,
      tuteeAttended: false
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Class Attendance Report</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutor Present</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutee Present</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map((session) => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap">{session.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{session.tutor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{session.tutee}</td>
                <td className="px-6 py-4 whitespace-nowrap">{session.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${session.tutorAttended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {session.tutorAttended ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${session.tuteeAttended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {session.tuteeAttended ? 'Present' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassAttendanceReport;
