import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import LogsPage from "@/pages/LogsPage";
import RoomsPage from "@/pages/RoomsPage";
import SchedulesPage from "@/pages/SchedulesPage";
import UsersPage from "@/pages/UsersPage";


export const AppRouter = () => {
  return (
    <>
    <Routes>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/schedules" element={<SchedulesPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
    </>
  );
};