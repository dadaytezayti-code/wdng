export interface RSVP {
  id?: string;
  name: string;
  attendance: "yes" | "no" | "tentative";
  side?: "bride" | "spouse";
  musicSuggestions?: string;
  plusOneCount: number;
  arrivalLocations?: string[];
  updatedAt?: string;
}

export interface EventBlock {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  address: string;
  mapLink: string;
  imageUrl: string;
  importance: string;
  photoCaption: string;
}
