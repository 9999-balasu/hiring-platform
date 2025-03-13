
import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  recruiter: string;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  recruiter: { type: String, required: true },
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
