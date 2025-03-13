"use client";
import { useState, useEffect } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
}

const JobSearch = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // ✅ Define type explicitly
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/api/jobs/search?search=${search}`)
      .then((res) => res.json())
      .then((data: Job[]) => setJobs(data)); // ✅ Ensure data is typed correctly
  }, [search]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Job Search</h2>
      <input
        type="text"
        placeholder="Search Jobs"
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 w-full bg-gray-800 rounded"
      />
      {jobs.length ? (
        jobs.map((job) => (
          <div key={job._id} className="p-4 bg-gray-800 rounded mb-2">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p>
              {job.company} - {job.location}
            </p>
            <a href={`/apply/${job._id}`} className="text-blue-400">
              Apply Now
            </a>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default JobSearch;
