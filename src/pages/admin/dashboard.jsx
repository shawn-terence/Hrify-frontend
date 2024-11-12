import React from 'react'
import Attend from '../../components/attend'
import AdminReports from '../../components/admReports'
const dashboard = () => {
  return (
    <div>
      <p className='text-center font-bold text-3xl'>Home Page</p>
      <div>
        <Attend />
      </div>
      <div>
        <AdminReports />
      </div>
      
    </div>
  )
}

export default dashboard
