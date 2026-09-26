export interface ProjectData {
  id?: number;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  techStack: string[];
  category: "top-notch" | "standard";
  ownerHighlight?: "owner1" | "owner2" | null;
}

export const projects: ProjectData[] = [];
