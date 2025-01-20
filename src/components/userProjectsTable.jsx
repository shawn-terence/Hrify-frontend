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
    axios.get("https://hrify-backend.onrender.com/projects/user/", {
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
        .put(`https://hrify-backend.onrender.com/projects/${projectId}/status/`, { status: newStatus }, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        })
        .then((response) => {
          
          setProjects(
            projects.map((project) =>
              project.id === projectId ? { ...project, status: newStatus } : project
            )
          );
          alert("Status updated successfully!"); 
        })
        .catch((error) => {
          console.error("Error updating project status", error);
          if (error.response && error.response.status === 403) {
            alert("Only project managers can update a project's status"); 
          } else {
            alert("An error occurred while updating the status."); 
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
        <TableColumn className="font-black text-sm">Project name</TableColumn>
        <TableColumn className="font-black text-sm">Description</TableColumn>
        <TableColumn className="font-black text-sm">Status</TableColumn>
        <TableColumn className="font-black text-sm">Start date</TableColumn>
        <TableColumn className="font-black text-sm">End date</TableColumn>
        <TableColumn className="font-black text-sm">Manager</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"no projects available"}>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-semi-bold text-base">{project.name}</TableCell>
            <TableCell className="font-semi-bold text-base" >{project.description}</TableCell>
            <TableCell className="font-semi-bold text-base">
              {project.status === "Completed" ? (
                project.status
              ) : (
                <Accordion>
                <AccordionItem className="font-semi-bold text-base"  title={project.status || "Pending"}>
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
            <TableCell className="font-semi-bold text-base">{project.start_date}</TableCell>
            <TableCell className="font-semi-bold text-base">{project.end_date || "Ongoing"}</TableCell>
            <TableCell className="font-semi-bold text-base">
              {project.manager_email}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserProjectsTable;
