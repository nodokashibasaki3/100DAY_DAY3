import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import TutorsManagement from './pages/TutorsManagement';
import TuteesManagement from './pages/TuteesManagement';
import SessionsManagement from './pages/SessionsManagement';
import EventsManagement from './pages/EventsManagement';
import VolunteerHoursReport from './pages/VolunteerHoursReport';
import AttendanceReport from './pages/AttendanceReport';
import ClassAttendanceReport from './pages/ClassAttendanceReport';

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tutors" element={<TutorsManagement />} />
            <Route path="/tutees" element={<TuteesManagement />} />
            <Route path="/sessions" element={<SessionsManagement />} />
            <Route path="/events" element={<EventsManagement />} />
            <Route path="/hours" element={<VolunteerHoursReport />} />
            <Route path="/attendance" element={<AttendanceReport />} />
            <Route path="/class-attendance" element={<ClassAttendanceReport />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;