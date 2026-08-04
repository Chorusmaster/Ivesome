import { faker } from "@faker-js/faker";
import { IdeaVisibility, IdeaStatus } from "./idea.types.js";

export async function makeIdea(overrides = {}) {
  return {
    authorId: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    shortDescription: faker.lorem.paragraph(),
    fullDescription: faker.lorem.text(),
    visibility: faker.helpers.arrayElement(Object.values(IdeaVisibility)),
    status: faker.helpers.arrayElement(Object.values(IdeaStatus)),
    ...overrides,
  };
}