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
  tags: string[];
  logoLink: string;
  mediaLinks: string[];
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
    tags: overrides.tags ?? 
    faker.helpers.arrayElements(
      [
        "saas",
        "b2b",
        "b2c",
        "fintech",
        "healthtech",
        "ai",
        "productivity",
        "education",
        "ecommerce",
        "marketing",
        "analytics",
        "startup",
      ],
      { min: 2, max: 5 }
    ),
    ...(overrides.logoLink !== undefined && {
      logoLink: overrides.logoLink,
    }),
    mediaLinks: overrides.mediaLinks ?? [],
  };
}
