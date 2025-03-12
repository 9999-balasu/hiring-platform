"use client";

import { useState } from "react";
import axios from "axios";

const ResumeParser = () => {
  const [resumeText, setResumeText] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    console.log("File selected:", file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      console.log("File read successfully:", text);
      if (typeof text === "string") {
        setResumeText(text);
      }
    };
    reader.onerror = (event) => {
      console.error("Error reading file:", event);
      setError("Failed to read file");
    };
    reader.readAsText(file);
  };

  const handleParse = async () => {
    setError("");
    setParsedData(null);
    setLoading(true);
    console.log("Sending resume text:", resumeText);

    try {
      const response = await axios.post(
        "/api/resume",
        { resumeText },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("API response:", response.data);
      setParsedData(response.data);
    } catch (err: any) {
      console.error("API error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to parse resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Resume Parser</h2>
      
      {/* File Upload Option */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Upload Resume File (TXT):</label>
        <input 
          type="file" 
          accept=".txt" 
          onChange={handleFileUpload}
          className="border p-2 rounded"
        />
      </div>

      {/* Textarea for Resume Text */}
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
        className="w-full border p-2 rounded mb-4 text-gray-700"
        rows={10}
      />

      <button
        onClick={handleParse}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Parsing..." : "Parse Resume"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {parsedData && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Parsed Resume Information:</h3>
          <div className="mt-2">
            <strong>Contact Info:</strong>
            <p>Name: {parsedData.contact?.name}</p>
            <p>Email: {parsedData.contact?.email}</p>
            <p>Phone: {parsedData.contact?.phone}</p>
          </div>
          <div className="mt-2">
            <strong>Skills:</strong>
            <ul className="list-disc list-inside">
              {parsedData.skills?.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <strong>Work Experience:</strong>
            <ul className="list-disc list-inside">
              {parsedData.workExperience?.map((exp: any, index: number) => (
                <li key={index}>
                  {exp.role} at {exp.company} ({exp.duration})
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <strong>Education:</strong>
            <ul className="list-disc list-inside">
              {parsedData.education?.map((edu: any, index: number) => (
                <li key={index}>
                  {edu.degree} from {edu.institution} ({edu.duration})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeParser;
