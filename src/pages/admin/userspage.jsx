import React from 'react'
import { Card,CardBody,CardFooter,CardHeader,Button,Link } from '@nextui-org/react'
import { Spacer } from '@nextui-org/react'
import UserList from '../../components/userList'
import ProjectsList from '../../components/projects'
import "../../styles/app.css"
const Users = () => {
  return (
    <div>
      <div className='grid gap-2 md:grid-cols-2'>
        <Card>
          <CardHeader>Total Employees</CardHeader>
          <CardBody>200</CardBody>
        </Card>
        <Card>
          <CardHeader>Total Employees</CardHeader>
          <CardBody>200</CardBody>
        </Card>
      </div>
      <Spacer y={4}/>     
      <Spacer y={4}/>
      <div>
        <UserList />
      </div>
      <Spacer y={4}/>
      <div>
        <ProjectsList />
      </div>

    </div>
  )
}

export default Users;
