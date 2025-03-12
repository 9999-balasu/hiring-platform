
/*"use client";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  recruiter: string;
}

const Dashboard = ({ recruiter, refresh }: { recruiter: string; refresh: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/get");
      if (!res.ok) throw new Error("Failed to load jobs");
      const data = await res.json();
      console.log("Fetched jobs:", data); // ✅ Debugging
      setJobs(data);
    } catch (err) {
      setError("Error loading jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [refresh]); // ✅ Fetch jobs every time `refresh` changes

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-blue-400">Logged in as: {recruiter}</p>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="p-4 bg-gray-800 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-gray-300">{job.company}</p>
              <p className="text-gray-400">{job.location}</p>
              <p className="text-blue-400 text-sm">Posted by: {job.recruiter}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;*/




"use client";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  recruiter: string;
}

const Dashboard = ({ recruiter, refresh }: { recruiter: string; refresh: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/get");
      if (!res.ok) throw new Error("Failed to load jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError("Error loading jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [refresh]); // ✅ Fetch jobs when `refresh` changes

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-blue-400">Logged in as: {recruiter}</p>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="p-4 bg-gray-800 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-gray-300">{job.company}</p>
              <p className="text-gray-400">{job.location}</p>
              <p className="text-blue-400 text-sm">Posted by: {job.recruiter}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

