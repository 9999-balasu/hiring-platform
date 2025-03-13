import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  jobPosting: Schema.Types.ObjectId;
  candidate: Schema.Types.ObjectId; // Reference to user
  status: 'applied' | 'interviewing' | 'hired' | 'rejected';
  resume: string; // You can store file URLs or base64 encoded resume
}

const ApplicationSchema: Schema = new Schema(
  {
    jobPosting: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['applied', 'interviewing', 'hired', 'rejected'], default: 'applied' },
    resume: { type: String },
  },
  { timestamps: true }
);

const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
export default Application;
