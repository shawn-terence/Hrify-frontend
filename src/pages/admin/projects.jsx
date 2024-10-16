import React, { useEffect, useState } from 'react';
import { Table, Spacer, TableCell, TableColumn, TableBody, TableRow, TableHeader } from '@nextui-org/react';
import axios from 'axios'; // Import axios

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    // Fetch all projects from the API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/projects/', {
          headers: {
            'Authorization': `Token ${token}`, // Assuming token-based auth
          },
        });

        setProjects(response.data); // Set the fetched projects
      } catch (err) {
        setError(err.message); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false at the end
      }
    };

    fetchProjects();
  }, [token]); // Add token as a dependency

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error fetching projects: {error}</p>; // Change color property to inline style
  }

  return (
    <div>
      <h2>All Projects</h2>
      <Spacer y={2} />

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <Table aria-label="Projects table" bordered shadow={false}>
          <TableHeader>
            <TableColumn>Project Name</TableColumn>
            <TableColumn>Manager</TableColumn>
            <TableColumn>Start Date</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.manager_email}</TableCell>
                <TableCell>{project.start_date}</TableCell>
                <TableCell>{project.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProjectsPage;
