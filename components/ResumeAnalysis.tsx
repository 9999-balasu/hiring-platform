"use client";
import { useState } from "react";

const ResumeAnalysis = () => {
  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");
  const [feedback, setFeedback] = useState<any>(null);

  const analyzeResume = async () => {
    if (!resumeId || !jobId) {
      alert("Please enter Resume ID and Job ID");
      return;
    }

    const res = await fetch("/api/resumes/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeId, jobId }),
    });

    const data = await res.json();
    setFeedback(data.feedback);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <h2 className="text-lg font-semibold mb-3">Resume Analysis</h2>
      <input
        type="text"
        placeholder="Resume ID"
        value={resumeId}
        onChange={(e) => setResumeId(e.target.value)}
        className="w-full p-2 mb-2 bg-gray-700 rounded"
      />
      <input
        type="text"
        placeholder="Job ID"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        className="w-full p-2 mb-2 bg-gray-700 rounded"
      />
      <button onClick={analyzeResume} className="w-full bg-blue-600 text-white p-2 rounded">🔍 Analyze Resume</button>
      {feedback && (
        <div className="mt-3">
          <p>Match Score: <span className="font-bold">{feedback.matchScore}</span></p>
          {feedback.missingSkills.length > 0 && <p>Missing Skills: {feedback.missingSkills.join(", ")}</p>}
          <p>{feedback.suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
