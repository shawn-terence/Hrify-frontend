import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLayout from '../../layouts/admin'; // Go up two levels
import Dashboard from "./dashboard"
import Profile from "../shared/profile"
import Attendance from '../shared/attendance';
import Leave from '../shared/leave';
import ReportsList from '../shared/report';
import AddUser from './addUser';
import Users from './userspage';
import Leaves from './leaves';
import CreateReport from './wreport';
import Report from './report';
import EmployeeDetails from './employeeDetails';
import AttendancePage from './attendance';
import ProjectsPage from './projects'
const Home = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admhome" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/reports" element={<ReportsList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/users" element={<Users/>}/>
        <Route path="/leaves" element={<Leaves/>}/>
        <Route path="/write/report/:id" element={<CreateReport/>}/>
        <Route path="/report" element={<Report/>}/>
        <Route path="/employee/:id" element={<EmployeeDetails/>}/>
        <Route path="/attendancepage" element={<AttendancePage/>}/>
        <Route path="/projects" element={<ProjectsPage/>}/>
      </Routes>
    </AdminLayout>
  )
}

export default Home