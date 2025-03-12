import mongoose, { Schema, Document } from 'mongoose';

export interface IJobPosting extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  skillsRequired: string[];
  recruiter: Schema.Types.ObjectId; // Reference to recruiter
}

const JobPostingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    skillsRequired: { type: [String], required: true },
    recruiter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const JobPosting = mongoose.models.JobPosting || mongoose.model<IJobPosting>('JobPosting', JobPostingSchema);
export default JobPosting;
