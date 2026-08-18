import type { UpdateProfileData } from "./profile.types";
import { api } from "@/api/axios";

export const updateProfile = async (data: UpdateProfileData) => {
  const formData = new FormData();

  if (data.firstName) {
    formData.append("firstName", data.firstName);
  }

  if (data.lastName) {
    formData.append("lastName", data.lastName);
  }

  if (data.login) {
    formData.append("login", data.login);
  }

  if (data.location) {
    formData.append("location", data.location);
  }

  if (data.bio) {
    formData.append("bio", data.bio);
  }

  if (data.about) {
    formData.append("about", data.about);
  }

  formData.append("skills", JSON.stringify(data.skills));
  formData.append("links", JSON.stringify(data.links));

  console.log(data.avatar);
  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const { data: user } = await api.put("/profile", formData);

  return user;
};

export const getProfile = async () => {
  const { data } = await api.get("/users");
  return data;
}