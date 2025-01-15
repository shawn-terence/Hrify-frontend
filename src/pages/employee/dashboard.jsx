import React, { useState } from 'react'

import Projects from '../../components/projects';
import Attend from '../../components/attend';
import AttendanceC from '../../components/attendance';
import Schedule from '../../components/schedule';
import ProjectsList from '../../components/projects';
import UserProjectsTable from '../../components/userProjectsTable';
const Dashboard = () => {
  const token=localStorage.getItem('token')

  const [user,setUser]=useState([])
  return (
    <>
      <div className='home-container    flex-col items-center'>
        <div>
        <p className='text-4xl text-center mt-2 font-bold'>Home Page</p>
          <div className='attendance-container'>
            <AttendanceC/>
          </div>
          <div className='project-container'>
            <p className='font-bold text-center text-lg'>My ongoing projects</p>
            <UserProjectsTable/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

