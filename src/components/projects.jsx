import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import axios from 'axios'; // Import axios

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://hrify-backend.onrender.com/projects/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        // Filter out projects with status 'on_hold' or 'completed'
        const activeProjects = response.data.filter(
          (project) => project.status !== 'on_hold' && project.status !== 'completed'
        );
        
        setProjects(activeProjects);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className='text-xl font-bold text-center'>Ongoing Projects</h2>
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Team Lead</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Team</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No projects available"}>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.manager_email}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.start_date}</TableCell>
              <TableCell>{project.end_date || 'N/A'}</TableCell>
              <TableCell>
                <ul>
                  {project.employee_emails.map((email, index) => (
                    <li key={index}>{email}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsList;
