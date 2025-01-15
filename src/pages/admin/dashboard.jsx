import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Attend from '../../components/attend';
import AdminReports from '../../components/admReports';
import { Card } from '@nextui-org/react';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://hrify-backend.onrender.com/users/', {
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
        const response = await axios.get('https://hrify-backend.onrender.com/leaves/', {
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

    // Fetch all projects
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://hrify-backend.onrender.com/projects/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProjects(response.data); // Store projects data
      } catch (err) {
        console.error('Error fetching projects', err);
        alert('Failed to load projects.');
      }
    };

    fetchUsers();
    fetchLeaves();
    fetchProjects();
  }, [token]);

  // Group projects by status
  const projectStatuses = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <p className="text-center font-bold text-3xl">Home Page</p>
      <div>
        <Attend />
      </div>
      <Card class='admstats'>
        <div className="infodiv">
          <Link to="/adm/users">
            <p className="text-lg">Total Employees: {employeeCount}</p>
            <p className="text-sm text-blue-500">Go to Employees Page</p> {/* Added text */}
          </Link>
        </div>
        <div className="infodiv">
          <Link to="/adm/projects">
            <p className="text-lg">Projects In Progress: {projectStatuses.in_progress || 0}</p>
            <p className="text-sm text-blue-500">Go to Projects Page</p> {/* Added text */}
          </Link>
        </div>
        <div className="infodiv">
          <Link to="/adm/leaves">
            <p className="text-lg">Pending Leave Requests: {pendingLeaveCount}</p>
            <p className="text-sm text-blue-500">Go to Leaves Page</p> {/* Added text */}
          </Link>
        </div>
      </Card>
      <div>
        <AdminReports />
      </div>
    </div>
  );
};

export default Dashboard;
