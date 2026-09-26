import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  techStack: string[];
  category: "top-notch" | "standard";
  ownerHighlight?: "owner1" | "owner2" | null;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    techStack: [{ type: String }],
    category: { type: String, enum: ["top-notch", "standard"], default: "standard" },
    ownerHighlight: { type: String, enum: ["owner1", "owner2", null], default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
