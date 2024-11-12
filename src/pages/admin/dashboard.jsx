import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Attend from '../../components/attend';
import AdminReports from '../../components/admReports';
import { Card,CardHeader,CardBody } from '@nextui-org/react';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const users = response.data;
        setEmployeeCount(users.length);
      } catch (error) {
        console.error('Error fetching users list', error);
        alert('Failed to load employee count.');
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <p className="text-center font-bold text-3xl">Home Page</p>
      <div>
        <Attend />
      </div>
      <Card className="text-center">
        <div className='infodiv'>
          <p>Total Employees: {employeeCount}</p>
        </div>
      </Card>
      <div>
        <AdminReports />
      </div>
    </div>
  );
};

export default Dashboard;
