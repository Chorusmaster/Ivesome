export type ProfileLinks = {
  website: string;
  linkedin: string;
};

export type ProfileStats = {
  ideas: number;
  projects: number;
  upvotes: number;
};

export type Profile = {
  name: string;
  role: string;
  email: string;
  location: string;
  joinedAt: Date;
  bio: string;
  about: string;
  skills: string[];
  links: ProfileLinks;
  stats: ProfileStats;
};

export type ProfileFormData = Pick<
  Profile,
  "name" | "role" | "location" | "bio" | "about" | "skills" | "links"
>;
