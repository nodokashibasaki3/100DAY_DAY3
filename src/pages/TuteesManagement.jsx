import React, { useState } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';

const TuteesManagement = () => {
  const [tutees, setTutees] = useState([
    { id: 1, name: 'Emma Watson', email: 'emma@email.com', age: 12, subject: 'Math' },
    { id: 2, name: 'Michael Brown', email: 'michael@email.com', age: 11, subject: 'Reading' }
  ]);

  const [newTutee, setNewTutee] = useState({ name: '', email: '', age: '', subject: '' });
  const [isAdding, setIsAdding] = useState(false);

  const addTutee = () => {
    if (!newTutee.name || !newTutee.email) return;
    setTutees([...tutees, { ...newTutee, id: tutees.length + 1 }]);
    setNewTutee({ name: '', email: '', age: '', subject: '' });
    setIsAdding(false);
  };

  const deleteTutee = (id) => {
    setTutees(tutees.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tutees Management</h1>
        <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
          <UserPlus className="mr-2 h-5 w-5" /> Add Tutee
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border px-3 py-2 rounded"
              placeholder="Full Name"
              value={newTutee.name}
              onChange={(e) => setNewTutee({ ...newTutee, name: e.target.value })}
            />
            <input
              className="border px-3 py-2 rounded"
              placeholder="Email"
              value={newTutee.email}
              onChange={(e) => setNewTutee({ ...newTutee, email: e.target.value })}
            />
            <input
              className="border px-3 py-2 rounded"
              type="number"
              placeholder="Age"
              value={newTutee.age}
              onChange={(e) => setNewTutee({ ...newTutee, age: e.target.value })}
            />
            <input
              className="border px-3 py-2 rounded"
              placeholder="Subject"
              value={newTutee.subject}
              onChange={(e) => setNewTutee({ ...newTutee, subject: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">Cancel</button>
            <button onClick={addTutee} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add</button>
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
            {tutees.map(tutee => (
              <tr key={tutee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tutee.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => deleteTutee(tutee.id)} className="text-red-600 hover:text-red-900">
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

export default TuteesManagement;