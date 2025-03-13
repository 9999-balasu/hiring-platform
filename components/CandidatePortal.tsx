"use client";

import { useState, useEffect } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
}

const CandidatePortal = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs/get");
        if (!res.ok) throw new Error("Failed to load jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);

  // Function to apply for a job
  const applyForJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/jobs/apply/${jobId}`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to apply");
      setAppliedJobs([...appliedJobs, jobId]);
    } catch (err) {
      console.error("Error applying for job", err);
    }
  };

  // Filter jobs based on search input
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">🎯 Candidate Portal</h1>

      {/* Search Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search job title..."
          className="p-2 bg-gray-800 rounded text-white w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          className="p-2 bg-gray-800 rounded text-white w-1/2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="p-4 bg-gray-800 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-gray-300">{job.company}</p>
              <p className="text-gray-400">{job.location}</p>
              <button
                className={`mt-2 px-4 py-2 rounded ${
                  appliedJobs.includes(job._id) ? "bg-green-500" : "bg-blue-600"
                }`}
                onClick={() => applyForJob(job._id)}
                disabled={appliedJobs.includes(job._id)}
              >
                {appliedJobs.includes(job._id) ? "Applied ✅" : "Apply Now"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default CandidatePortal;
