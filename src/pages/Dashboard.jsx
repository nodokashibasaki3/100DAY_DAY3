import React from 'react';
import { User, Users, Clock, Calendar, Bookmark } from 'lucide-react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const activityFeed = [
    { action: "New tutee registration", name: "Emma Watson", time: "Today, 9:15 AM" },
    { action: "Session completed", name: "John Smith & Michael Brown", time: "Yesterday, 4:30 PM" },
    { action: "Volunteer hours logged", name: "Laura Johnson", time: "Yesterday, 3:45 PM" },
    { action: "Event attendance updated", name: "Science Fair Helpers", time: "Apr 18, 2025" },
    { action: "Tutor assignment changed", name: "Sarah Davis → Alex Wilson", time: "Apr 17, 2025" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tutors" value="24" icon={<User className="h-10 w-10 text-indigo-600" />} />
        <StatCard title="Total Tutees" value="48" icon={<Users className="h-10 w-10 text-green-600" />} />
        <StatCard title="Weekly Sessions" value="36" icon={<Clock className="h-10 w-10 text-amber-600" />} />
        <StatCard title="Upcoming Events" value="3" icon={<Calendar className="h-10 w-10 text-red-600" />} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activityFeed.map((activity, index) => (
            <div key={index} className="flex items-center border-b border-gray-200 pb-2 last:border-0">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Bookmark className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.name}</p>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Total Volunteer Hours</h2>
          <div className="flex items-end space-x-2">
            <div className="text-4xl font-bold text-indigo-600">247</div>
            <div className="text-green-500 text-sm pb-2">+12% from last month</div>
          </div>
          <p className="text-gray-500 mt-2">Hours logged for April 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Event Attendance Rate</h2>
          <div className="flex items-end space-x-2">
            <div className="text-4xl font-bold text-indigo-600">87%</div>
            <div className="text-amber-500 text-sm pb-2">-3% from last month</div>
          </div>
          <p className="text-gray-500 mt-2">Average attendance for April 2025 events</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;