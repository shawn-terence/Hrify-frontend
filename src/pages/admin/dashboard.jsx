import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Attend from '../../components/attend';
import AdminReports from '../../components/admReports';
import { Card } from '@nextui-org/react';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all users
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

    // Fetch all leave requests
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/leaves/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const leaves = response.data;
        const pendingLeaves = leaves.filter(leave => leave.status === 'pending');
        setPendingLeaveCount(pendingLeaves.length);
      } catch (err) {
        console.error('Error fetching leave requests', err);
        alert('Failed to load leave requests.');
      }
    };

    fetchUsers();
    fetchLeaves();
  }, [token]);

  return (
    <div>
      <p className="text-center font-bold text-3xl">Home Page</p>
      <div>
        <Attend />
      </div>
      <Card className="text-center">
        <div className="infodiv">
          <p className="text-lg">Total Employees: {employeeCount}</p>
          <p className="text-lg">Pending Leave Requests: {pendingLeaveCount}</p>
        </div>
        <div className="infodiv">
          <p className="text-lg">Pending Leave Requests: {pendingLeaveCount}</p>
        </div>

      </Card>
      <div>
        <AdminReports />
      </div>
    </div>
  );
};

export default Dashboard;
