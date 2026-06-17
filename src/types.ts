export interface SliderDate {
  date: string;
  tagline?: string;
  permission: "No" | "Yes" | "Maybe";
  status: string;
  noteId?: string;
  twoLines?: boolean;
  unpublished?: boolean;
}
