import React, { useState } from 'react';
import { Calendar, Edit, Trash2, Check, X } from 'lucide-react';

const SessionsManagement = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      tutor: 'John Smith',
      tutee: 'Emma Watson',
      date: '2025-04-20',
      startTime: '15:00',
      endTime: '16:00',
      subject: 'Math',
      status: 'Scheduled'
    },
    {
      id: 2,
      tutor: 'Sarah Davis',
      tutee: 'Michael Brown',
      date: '2025-04-21',
      startTime: '14:00',
      endTime: '15:00',
      subject: 'Science',
      status: 'Completed'
    }
  ]);

  const updateSessionStatus = (id, status) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status } : s));
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sessions Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
          <Calendar className="mr-2 h-5 w-5" /> Schedule Session
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map(session => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap">{session.tutor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{session.tutee}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(session.date).toLocaleDateString()}<br />
                  <span className="text-sm text-gray-500">{session.startTime} - {session.endTime}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{session.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    session.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : session.status === 'Cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    {session.status === 'Scheduled' && (
                      <>
                        <button onClick={() => updateSessionStatus(session.id, 'Completed')} className="text-green-600 hover:text-green-900">
                          <Check className="h-5 w-5" />
                        </button>
                        <button onClick={() => updateSessionStatus(session.id, 'Cancelled')} className="text-red-600 hover:text-red-900">
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => deleteSession(session.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionsManagement;
