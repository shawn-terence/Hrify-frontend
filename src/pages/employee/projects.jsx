import React from "react";
import CreateProjectForm from "../../components/createProjectForm";
import UserProjectsTable from "../../components/userProjectsTable";
import { Spacer } from "@nextui-org/react";

const ProjectsPage = () => {
  return (
    <div>
      <p className="text-3xl font-bold text-center">Projects Page</p>
      <Spacer y={2} />
      <CreateProjectForm />
      <Spacer y={2} />
      <UserProjectsTable />
    </div>
  );
};

export default ProjectsPage;
