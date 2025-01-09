import React from 'react'
import LeaveRequestForm from '../../components/leaveForm'
import LeaveRequestsList from '../../components/leaveList'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { Spacer } from '@nextui-org/react'
const Leave = () => {
  return (
    <div>
      <p className='text-3xl font-bold text-center'> Leave Request Page</p>
      <Tabs initialActiveKey="1" >
        <Tab id="1" key="1" title="Leave Form">
          <LeaveRequestForm/>
        </Tab>
        <Tab id="2" key="2" title="Leave Requests">
          <LeaveRequestsList/>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Leave
