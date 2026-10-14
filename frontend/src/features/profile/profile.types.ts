export type ProfileStats = {
  ideas: number;
  projects: number;
  upvotes: number;
};

export type ProfileLocation = {
  latitude: number;
  longitude: number;
  countryCode?: string | null;
};

export type Profile = {
  location?: ProfileLocation | null;
  bio?: string;
  about?: string;
  skills: string[];
  interests: string[];
  links: ProfileLinkInput[];
  stats: ProfileStats;
};

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  login: string;
  location?: ProfileLocation | null;
  bio?: string;
  about?: string;
  skills: string[];
  interests: string[];
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