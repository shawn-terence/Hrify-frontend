import React from 'react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { Spacer } from '@nextui-org/react'
import UserList from '../../components/userList'
import ProjectsList from '../../components/projects'
import "../../styles/app.css"
const Users = () => {
  return (
    <div>
      <p className='text-center font-bold text-3xl mb-5'>Employee Page</p>
      <Tabs initialActiveKey="1"  color="error">
        <Tab key="1" icon="user" aria-label="Users" title="Employees">
          <div>
            <UserList/>
          </div>
        </Tab>
        <Tab key="2" title="employee things">
          <div>
            <ProjectsList/>
          </div>
        </Tab>
      </Tabs>
      {/* <div>
        <UserList />
      </div>
      <Spacer y={4}/>
      <div>
        <ProjectsList />
      </div> */}

    </div>
  )
}

export default Users;
