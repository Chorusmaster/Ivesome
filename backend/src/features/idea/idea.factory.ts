import { faker } from "@faker-js/faker";
import { IDEA_VISIBILITY_VALUES, IDEA_STATUS_VALUES } from "./idea.types.js";

export async function makeIdea(overrides = {}) {
  return {
    authorId: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    shortDescription: faker.lorem.paragraph(),
    fullDescription: faker.lorem.text(),
    visibility: faker.helpers.arrayElement(IDEA_VISIBILITY_VALUES),
    status: faker.helpers.arrayElement(IDEA_STATUS_VALUES),
    ...overrides,
  };
}
