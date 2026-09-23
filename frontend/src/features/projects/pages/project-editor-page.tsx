import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ProjectEditorForm from "@/features/projects/ui/project-editor-form";
import Loading from "@/shared/ui/loading";
import { createProject, getProject, updateProject } from "../projects.api";
import type { CreateProjectPayload, Project } from "../projects.types";

function ProjectEditorPage() {
  const { t } = useTranslation();
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
    return <Loading fullScreen={true} text={t("projects.loadingProject")} />;
  }

  if (isEditMode && !project) {
    return (
      <div className="main-container-narrow text-danger">
        {t("projects.notFound")}
      </div>
    );
  }

  return (
    <div className="main-container-narrow">
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-text-primary text-title">
          {isEditMode
            ? t("projects.editor.editTitle")
            : t("projects.editor.newTitle")}
        </h1>
        <div className="text-text-secondary mb-8">
          {isEditMode
            ? t("projects.editor.editDescription")
            : t("projects.editor.newDescription")}
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
                skills: project.skills,
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
