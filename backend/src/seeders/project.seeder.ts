import { makeProject } from "../features/project/project.factory.js";
import {
  deleteAllProjects,
  createProject
} from "../features/project/project.repository.js";
import { getAllUsers } from "../features/user/user.repository.js";

export async function seedProjects() {
  await deleteAllProjects();

  let users = await getAllUsers();

  if (!users || users.length === 0) {
    throw new Error("No users found in the database. Please seed users first.");
  }

  for (let i = 0; i < 10; i++) {
    const user = users[Math.floor(Math.random() * users.length)];

    if (!user) {
      throw new Error("No user available");
    }

    const projectData = await makeProject({visibility: "PUBLIC"});

    await createProject(
      projectData,
      user.id.toString()
    );
  }
}
