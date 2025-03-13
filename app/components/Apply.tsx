"use client";
import { useState } from "react";

const Apply = ({ jobId }: { jobId: string }) => {
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, candidateId: "123", coverLetter }),
    });

    if (response.ok) alert("Applied successfully!");
    else alert("Failed to apply.");
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
      <textarea onChange={(e) => setCoverLetter(e.target.value)} className="p-2 w-full bg-gray-800 rounded" placeholder="Write Cover Letter"></textarea>
      <button onClick={handleSubmit} className="bg-blue-600 p-2 mt-4 rounded">Submit Application</button>
    </div>
  );
};

export default Apply;
