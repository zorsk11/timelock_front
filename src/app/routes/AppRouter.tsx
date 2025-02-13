import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import LogsPage from "@/pages/LogsPage";
import RoomsPage from "@/pages/RoomsPage";
import SchedulesPage from "@/pages/SchedulesPage";
import UsersPage from "@/pages/UsersPage";

// Импорт layout-компонентов
import AuthLayout from "@shared/context/AuthLayout"; 
import MainLayout from "@shared/context/MainLayout"; // Layout без сайдбара

export const AppRouter = () => {
  return (
    <Routes>
      {/* Маршруты без сайдбара (например, страница логина) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Маршруты с сайдбаром */}
      <Route element={<MainLayout />}>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};
