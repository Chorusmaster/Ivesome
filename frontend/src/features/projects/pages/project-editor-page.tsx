import ProjectEditorForm from "@/features/projects/ui/project-editor-form";
import { createProject, getProject } from "../projects.api";
import { useNavigate } from "react-router-dom";
import type { CreateProjectPayload } from "../projects.types";
import { useEffect } from "react";

function NewIdeaPage() {
  const navigate = useNavigate();

  const cancelEdit = () => {
    navigate("/search");
  }

  return (
    <div className="main-container-narrow">
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-text-primary text-title">
          New idea
        </h1>
        <div className="text-text-secondary mb-8">
          Share with the world what's on your mind today
        </div>
      </div>

      <ProjectEditorForm 
        onCancel={cancelEdit} 
        onSubmit={(data: CreateProjectPayload) => {createProject(data); navigate("/search");}} 
      />
    </div>
  );
}

export default NewIdeaPage;
