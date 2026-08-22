import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectEditorForm from "@/features/projects/ui/project-editor-form";
import Loading from "@/shared/ui/loading";
import { createProject, getProject, updateProject } from "../projects.api";
import type { CreateProjectPayload, Project } from "../projects.types";

function ProjectEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode || !id) {
      setProject(null);
      setLoading(false);
      return;
    }

    const projectId = id;

    async function fetchProject() {
      try {
        setLoading(true);
        const projectData = await getProject(projectId);
        setProject(projectData);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id, isEditMode]);

  const cancelEdit = () => {
    navigate(isEditMode && id ? `/project/${id}` : "/search");
  };

  const handleSubmit = async (data: CreateProjectPayload) => {
    if (isEditMode && id) {
      await updateProject(id, data);
      navigate(`/project/${id}`);
      return;
    }

    await createProject(data);
    navigate("/search");
  };

  if (isEditMode && loading) {
    return <Loading fullScreen={true} text="Loading project..." />;
  }

  if (isEditMode && !project) {
    return (
      <div className="main-container-narrow text-danger">Project not found</div>
    );
  }

  return (
    <div className="main-container-narrow">
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-text-primary text-title">
          {isEditMode ? "Edit project" : "New idea"}
        </h1>
        <div className="text-text-secondary mb-8">
          {isEditMode
            ? "Update your project details and keep your idea moving forward."
            : "Share with the world what's on your mind today"}
        </div>
      </div>

      <ProjectEditorForm
        initialValues={
          project
            ? {
                title: project.title,
                shortDescription: project.shortDescription,
                description: project.description ?? "",
                tags: project.tags,
                visibility: project.visibility,
              }
            : undefined
        }
        onCancel={cancelEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ProjectEditorPage;
