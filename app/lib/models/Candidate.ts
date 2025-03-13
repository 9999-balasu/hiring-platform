import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String], // List of skills
  experience: Number, // Years of experience
  education: String, // Degree
  resumeText: String, // Parsed resume text
});

export default mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);
