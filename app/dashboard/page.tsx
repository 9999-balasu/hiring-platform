/*"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the Job type
type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  applicationsCount?: number;
};

const Dashboard = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");

  // Fetch jobs posted by the recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/recruiter/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data.error || "Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);

  // Simple analytics: total jobs and total applications
  const totalJobs = jobs.length;
  const totalApplications = jobs.reduce((acc, job) => acc + (job.applicationsCount || 0), 0);

  // Navigate to job creation page
  const handleCreateJob = () => {
    router.push("/jobs/create");
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>

      {/* Simple Analytics */
     /* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Total Job Posts</h2>
          <p className="text-gray-600">{totalJobs}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Total Applications</h2>
          <p className="text-gray-600">{totalApplications}</p>
        </div>
      </div>

      {/* Job Posting Creation Interface */
     /* <div className="mb-6">
        <button
          onClick={handleCreateJob}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Job Post
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Candidate Application Tracking View */
      /*<div className="space-y-4">
        {jobs.length === 0 ? (
          <p>No job postings available.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-gray-500">Location: {job.location}</p>
              <p className="mt-2">
                <span className="font-bold">Applications:</span>{" "}
                {job.applicationsCount || 0}
              </p>
              <button
                onClick={() => router.push(`/recruiter/job/${job._id}`)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                View Applications
              </button>
            </div>
          ))
        )}
      </div>

      {/* Logout Button */
      /*<button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;*/


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define a type for Job objects
type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  applicationsCount: number;
};

const Dashboard = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");

  // Fetch jobs posted by the recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/recruiter/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.error || "Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);

  // Calculate simple analytics
  const totalJobs = jobs.length;
  const totalApplications = jobs.reduce((acc, job) => acc + job.applicationsCount, 0);

  // Navigate to the job creation page
  const handleCreateJob = () => {
    router.push("/jobs/create");
  };

  // Delete a job post (placeholder function; ensure you implement the API endpoint)
  const handleDelete = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/recruiter/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err: any) {
      console.error("Error deleting job:", err);
    }
  };

  // Logout: clear token and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-amber-100">Recruiter Dashboard</h1>
      
      {/* Simple Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-black">Total Job Posts</h2>
          <p className="text-gray-600">{totalJobs}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold text-black">Total Applications</h2>
          <p className="text-gray-600">{totalApplications}</p>
        </div>
      </div>

      {/* Job Posting Creation */}
      <div className="mb-6">
        <button
          onClick={handleCreateJob}
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Job Post
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Candidate Application Tracking View */}
      {jobs.length === 0 ? (
        <p>No job postings available.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-gray-500 ">Location: {job.location}</p>
              <p className="mt-2">
                <span className="font-bold text-black">Applications: </span>
                {job.applicationsCount}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => router.push(`/recruiter/job/${job._id}`)}
                  className="bg-green-500 text-black px-3 py-1 mr-2 rounded hover:bg-green-600"
                >
                  View Applications
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

