import { api } from "@/api/axios";
import type {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
  AddMemberPayload,
} from "./projects.types";

export const getProjects = async (skip?: number, take?: number) => {
  const { data } = await api.get<Project[]>("/projects", {
    params: {
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
    },
  });
  return data;
};

export const getPublicProjects = async (skip?: number, take?: number) => {
  const { data } = await api.get<Project[]>("/projects/public", {
    params: {
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
    },
  });
  return data;
};

export const getUserProjects = async (
  userId: string,
  skip?: number,
  take?: number,
) => {
  const { data } = await api.get<Project[]>(`/projects/user/${userId}`, {
    params: {
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
    },
  });
  return data;
};

export const getFavouriteProjects = async (skip?: number, take?: number) => {
  const { data } = await api.get<Project[]>("/projects/favourite", {
    params: {
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
    },
  });
  return data;
};

export const getProject = async (projectId: string) => {
  const { data } = await api.get<Project>(`/projects/${projectId}`);
  return data;
};

export const createProject = async (payload: CreateProjectPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("visibility", payload.visibility);
  formData.append("shortDescription", payload.shortDescription);

  if (payload.status) {
    formData.append("status", payload.status);
  }

  if (payload.description) {
    formData.append("description", payload.description);
  }

  if (payload.tags) {
    formData.append("tags", JSON.stringify(payload.tags));
  }

  if (payload.media) {
    payload.media.forEach((file) => {
      formData.append("media", file);
    });
  }

  if (payload.logo) {
    formData.append("logo", payload.logo);
  }

  const { data } = await api.post<Project>("/projects", formData);
  return data;
};

export const updateProject = async (
  projectId: string,
  payload: UpdateProjectPayload,
) => {
  const formData = new FormData();

  if (payload.title !== undefined) {
    formData.append("title", payload.title);
  }

  if (payload.shortDescription !== undefined) {
    formData.append("shortDescription", payload.shortDescription);
  }

  if (payload.description !== undefined) {
    formData.append("description", payload.description);
  }

  if (payload.visibility !== undefined) {
    formData.append("visibility", payload.visibility);
  }

  if (payload.status !== undefined) {
    formData.append("status", payload.status);
  }

  if (payload.tags !== undefined) {
    formData.append("tags", JSON.stringify(payload.tags));
  }

  if (payload.media) {
    payload.media.forEach((file) => {
      formData.append("media", file);
    });
  }

  if (payload.logo) {
    formData.append("logo", payload.logo);
  }

  const { data } = await api.put<Project>(`/projects/${projectId}`, formData);
  return data;
};

export const turnIdeaIntoProject = async (projectId: string) => {
  const { data } = await api.post<Project>(`/projects/${projectId}/turn-into-project`);
  return data;
};

export const deleteProject = async (projectId: string) => {
  await api.delete(`/projects/${projectId}`);
};

export const addProjectMember = async (
  projectId: string,
  userId: string,
  payload?: AddMemberPayload,
) => {
  const { data } = await api.post(
    `/projects/${projectId}/members/${userId}`,
    payload || {},
  );
  return data;
};

export const removeProjectMember = async (
  projectId: string,
  userId: string,
) => {
  await api.delete(`/projects/${projectId}/members/${userId}`);
};
