"use client";
import { useState } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch("/api/resumes/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) setMessage("✅ Resume uploaded successfully!");
    else setMessage("❌ Upload failed: " + data.error);
  };

  return (
    <div className="p-4 bg-gray-900 text-white border border-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Upload Resume</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" />
      <button onClick={handleSubmit} className="w-full bg-blue-600 text-white p-2 rounded">📂 Upload Resume</button>
      {message && <p className="mt-2 text-green-400">{message}</p>}
    </div>
  );
};

export default ResumeUpload;
