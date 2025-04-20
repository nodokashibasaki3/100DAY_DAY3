import React, { useState } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';

const TutorsManagement = () => {
  const [tutors, setTutors] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', age: 22, subject: 'Math' },
    { id: 2, name: 'Sarah Davis', email: 'sarah@email.com', age: 24, subject: 'Biology' }
  ]);

  const [newTutor, setNewTutor] = useState({ name: '', email: '', age: '', subject: '' });
  const [isAdding, setIsAdding] = useState(false);

  const addTutor = () => {
    if (!newTutor.name || !newTutor.email) return;
    setTutors([...tutors, { ...newTutor, id: tutors.length + 1 }]);
    setNewTutor({ name: '', email: '', age: '', subject: '' });
    setIsAdding(false);
  };

  const deleteTutor = (id) => {
    setTutors(tutors.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tutors Management</h1>
        <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
          <UserPlus className="mr-2 h-5 w-5" /> Add Tutor
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border px-3 py-2 rounded"
              placeholder="Full Name"
              value={newTutor.name}
              onChange={(e) => setNewTutor({ ...newTutor, name: e.target.value })}
            />
            <input
              className="border px-3 py-2 rounded"
              placeholder="Email"
              value={newTutor.email}
              onChange={(e) => setNewTutor({ ...newTutor, email: e.target.value })}
            />
            <input
              className="border px-3 py-2 rounded"
              type="number"
              placeholder="Age"
              value={newTutor.age}
              onChange={(e) => setNewTutor({ ...newTutor, age: e.target.value })}
            />
            <input
              className="border px-3 py-2 rounded"
              placeholder="Subject"
              value={newTutor.subject}
              onChange={(e) => setNewTutor({ ...newTutor, subject: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">Cancel</button>
            <button onClick={addTutor} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tutors.map(tutor => (
              <tr key={tutor.id}>
                <td className="px-6 py-4 whitespace-nowrap">{tutor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutor.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutor.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => deleteTutor(tutor.id)} className="text-red-600 hover:text-red-900">
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

export default TutorsManagement;