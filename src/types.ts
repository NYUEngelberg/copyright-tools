export interface SliderDate {
  id: string;
  date: string;
  tagline?: string;
  permission: "No" | "Yes" | "Maybe";
  status: string;
  twoLines?: boolean;
  unpublished?: boolean;
  /** IDs into SLIDER_NOTES, rendered in order. */
  note?: string[];
}
