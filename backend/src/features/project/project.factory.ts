import { faker } from "@faker-js/faker";
import {
  PROJECT_STAGE_VALUES,
  PROJECT_VISIBILITY_VALUES,
  PROJECT_STATUS_VALUES,
} from "./project.types.js";
import type {
  ProjectStage,
  ProjectVisibility,
  ProjectStatus,
} from "./project.types.js";

type ProjectFactoryOverrides = Partial<{
  title: string;
  shortDescription: string;
  description: string;
  stage: ProjectStage;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  media: string[];
}>;

export async function makeProject(overrides: ProjectFactoryOverrides = {}) {
  return {
    title: overrides.title ?? faker.commerce.productName(),
    shortDescription: overrides.shortDescription ?? faker.lorem.sentence(),
    description: overrides.description ?? faker.lorem.paragraphs(2),
    stage: 
      overrides.stage ?? 
      faker.helpers.arrayElement(PROJECT_STAGE_VALUES),
    visibility:
      overrides.visibility ??
      faker.helpers.arrayElement(PROJECT_VISIBILITY_VALUES),
    status:
      overrides.status ?? 
      faker.helpers.arrayElement(PROJECT_STATUS_VALUES),
    media: overrides.media ?? [],
  };
}
