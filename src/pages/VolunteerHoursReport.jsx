import React, { useState } from 'react';

const VolunteerHoursReport = () => {
  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      totalHours: 28,
      monthlyHours: [
        { month: 'January', hours: 4 },
        { month: 'February', hours: 6 },
        { month: 'March', hours: 8 },
        { month: 'April', hours: 10 }
      ]
    },
    {
      id: 2,
      name: 'Sarah Davis',
      email: 'sarah.davis@email.com',
      totalHours: 34,
      monthlyHours: [
        { month: 'January', hours: 6 },
        { month: 'February', hours: 8 },
        { month: 'March', hours: 10 },
        { month: 'April', hours: 10 }
      ]
    }
  ]);

  const months = ['January', 'February', 'March', 'April'];

  const totalMonthlyHours = months.map(month => {
    return {
      month,
      hours: tutors.reduce((total, tutor) => {
        const monthData = tutor.monthlyHours.find(m => m.month === month);
        return total + (monthData ? monthData.hours : 0);
      }, 0)
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Volunteer Hours Report</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Total Volunteer Hours</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {totalMonthlyHours.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-medium text-gray-700">{item.month}</h3>
              <p className="text-2xl font-bold text-indigo-600 mt-2">{item.hours}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tutor Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Hours</th>
                {months.map((month, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{month}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tutors.map((tutor) => (
                <tr key={tutor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{tutor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tutor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-indigo-600">{tutor.totalHours}</td>
                  {months.map((month, idx) => {
                    const m = tutor.monthlyHours.find(h => h.month === month);
                    return <td key={idx} className="px-6 py-4 whitespace-nowrap">{m ? m.hours : 0}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHoursReport;
