export interface SliderDate {
  date: string;
  tagline?: string;
  permission: "No" | "Yes" | "Maybe";
  status: string;
  noteId?: string;
  twoLines?: boolean;
  unpublished?: boolean;
}

export interface ScholarBio {
  name: string;
  title: string;
  institution: string;
  description: string;
  podcastUrl?: string;
  publications?: string[];
}

export interface ResourceTool {
  title: string;
  imgUrl: string;
  description: string;
  url: string;
  embedCode: string;
}
