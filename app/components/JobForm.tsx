

import { useState } from "react";

interface JobFormProps {
  recruiter: string;
  onJobPosted: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ recruiter, onJobPosted }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      title,
      description: "React & Next.js Developer needed",
      skills: ["React", "Next.js", "TypeScript"],
      recruiterId: recruiter, // ✅ Using recruiter prop
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      onJobPosted(); // ✅ Call the callback function after posting
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-900 text-white border border-gray-700 rounded-lg"
    >
      <h2 className="text-lg font-semibold mb-3">Post a Job</h2>
      <input
        className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded"
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded"
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <input
        className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded">
        🚀 Post Job
      </button>
    </form>
  );
};

export default JobForm;
