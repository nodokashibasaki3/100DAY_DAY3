import React, { useState } from 'react';
import { Calendar, Edit, Trash2 } from 'lucide-react';

const EventsManagement = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Science Fair', date: '2025-04-25', time: '14:00 - 17:00', location: 'Main Hall', description: 'Annual science fair' },
    { id: 2, name: 'Book Club', date: '2025-04-28', time: '16:00 - 17:30', location: 'Library', description: 'Monthly book discussion' }
  ]);

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center">
          <Calendar className="mr-2 h-5 w-5" /> Add New Event
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-500">
                  {new Date(event.date).toLocaleDateString()} • {event.time} • {event.location}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => deleteEvent(event.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsManagement;