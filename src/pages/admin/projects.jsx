import React, { useEffect, useState } from 'react';
import { Input, Spacer, Table, TableCell, TableColumn, TableBody, TableRow, TableHeader } from '@nextui-org/react';
import axios from 'axios';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/projects/', {
          headers: {
            'Authorization': `Token ${token}`, // Assuming token-based auth
          },
        });

        setProjects(response.data); // Set the fetched projects
        setFilteredProjects(response.data); // Initialize the filtered projects
      } catch (err) {
        setError(err.message); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false at the end
      }
    };

    fetchProjects();
  }, [token]); 

  // Handle search input changes
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(term)
      )
    );
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error fetching projects: {error}</p>; // Change color property to inline style
  }

  return (
    <div>
      <h2 className='text-3xl font-bold text-center'>All Projects</h2>
      <Spacer y={1} />
      <Input
        clearable
        placeholder="Search projects by name..."
        value={searchTerm}
        onChange={handleSearch}
        aria-label="Search projects"
        fullWidth
      />
      <Spacer y={2} />

      {filteredProjects.length === 0 ? (
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
            {filteredProjects.map((project) => (
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
