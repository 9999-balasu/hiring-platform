// models/Resume.ts





import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: String,
  contactInfo: String,
  skills: [String],
  experience: String,
  education: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
