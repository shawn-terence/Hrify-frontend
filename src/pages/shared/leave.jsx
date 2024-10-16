import React from 'react'
import LeaveRequestForm from '../../components/leaveForm'
import LeaveRequestsList from '../../components/leaveList'
import { Spacer } from '@nextui-org/react'
const Leave = () => {
  return (
    <div>
      <p className='text-3xl font-bold text-center'> Leave Request Page</p>
      <Spacer y={2} />
      <LeaveRequestForm/>
      <Spacer y={6} />
      <LeaveRequestsList />
    </div>
  )
}

export default Leave
