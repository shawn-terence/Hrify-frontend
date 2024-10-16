//@ts-nocheck
import React from 'react'
import { Route, Routes } from "react-router-dom";
import DefaultLayout from '../../layouts/default'; // Go up two levels
import Dashboard from "./dashboard"
import Profile from "../shared/profile"
import Attendance from '../shared/attendance';
import Leave from '../shared/leave';
import ReportsList from '../shared/report';
import ProjectsPage from './projects';
const Home = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/emphome" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/reports" element={<ReportsList />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </DefaultLayout>
  )
}

export default Home
