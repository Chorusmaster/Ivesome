import { api } from "@/api/axios";

export const getFavourite = async (
  projectId: string,
): Promise<boolean> => {
  const result = await api.get(`/projects/${projectId}/favourite`);
  console.log(!!result.data);
  return !!result.data;
};

export const toggleFavourite = async (
  projectId: string,
): Promise<boolean> => {
  const result = await api.patch(`/projects/${projectId}/favourite`);
  console.log(result.data.isFavourite);
  return result.data.isFavourite;
};