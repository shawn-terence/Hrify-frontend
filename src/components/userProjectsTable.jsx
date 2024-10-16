import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table,TableHeader,TableBody,TableCell,TableRow,TableColumn, Button, Input,AccordionItem,Accordion } from "@nextui-org/react";


const UserProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const token=localStorage.getItem('token')
  useEffect(() => {
    // Fetch the user's projects
    axios.get("http://localhost:8000/projects/user/", {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    .then((response) => {
      setProjects(response.data);
    })
    .catch((error) => {
      console.error("Error fetching projects", error);
    });
  }, []);

  const handleStatusUpdate = (projectId, newStatus) => {
      setLoading(true);
      axios
        .put(`http://localhost:8000/projects/${projectId}/status/`, { status: newStatus }, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        })
        .then((response) => {
          // Update the project in the list with the new status
          setProjects(
            projects.map((project) =>
              project.id === projectId ? { ...project, status: newStatus } : project
            )
          );
          alert("Status updated successfully!"); // Success message
        })
        .catch((error) => {
          console.error("Error updating project status", error);
          if (error.response && error.response.status === 403) {
            alert("Only project managers can update a project's status"); // Forbidden message
          } else {
            alert("An error occurred while updating the status."); // General error message
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
  

  return (
    <Table
      aria-label="User Projects Table"
    >
      <TableHeader>
        <TableColumn>PROJECT NAME</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>START DATE</TableColumn>
        <TableColumn>END DATE</TableColumn>
        <TableColumn>Manager</TableColumn>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>
              {project.status === "Completed" ? (
                project.status
              ) : (
                <Accordion>
                <AccordionItem title={project.status || "Pending"}>
                  <div className="flex flex-col items-start">
                    <p onClick={() => handleStatusUpdate(project.id, "Pending")}>
                      Pending
                    </p>
                    <p onClick={() => handleStatusUpdate(project.id, "In Progress")}>
                      In Progress
                    </p>
                    <p onClick={() => handleStatusUpdate(project.id, "Completed")}>
                      Completed
                    </p>
                  </div>
                </AccordionItem>
              </Accordion>
              )}
            </TableCell>
            <TableCell>{project.start_date}</TableCell>
            <TableCell>{project.end_date || "Ongoing"}</TableCell>
            <TableCell>
              {project.manager_email}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserProjectsTable;
