export type ProfileStats = {
  ideas: number;
  projects: number;
  upvotes: number;
};

export type Profile = {
  location?: string;
  bio?: string;
  about?: string;
  skills: string[];
  links: ProfileLinkInput[];
  stats: ProfileStats;
};

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  login: string;
  location?: string;
  bio?: string;
  about?: string;
  skills: string[];
  links: ProfileLinkInput[];
  avatar?: File;
}

export type ProfileLinkInput = {
  id: string;
  link: string;
};

export interface ProfileLink {
  type: "GITHUB" | "LINKEDIN" | "UNKNOWN"
  link: string
}