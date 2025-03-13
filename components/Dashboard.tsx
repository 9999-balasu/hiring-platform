"use client";
import { useEffect, useState } from "react";
import ResumeAnalysis from "./ResumeAnalysis";

import CandidatePortal from "./CandidatePortal";


interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  recruiter: string;
}

interface Match {
  candidateId: string;
  name: string;
  email: string;
  score: number;
  explanation: string;
}

const Dashboard = ({ recruiter, refresh }: { recruiter: string; refresh: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<{ [jobId: string]: Match[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("jobs");

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

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/match");
      if (!res.ok) throw new Error("Failed to load matches");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError("Error loading matches");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    fetchMatches();
  }, [refresh]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-blue-400">Logged in as: {recruiter}</p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded ${activeTab === "jobs" ? "bg-blue-600" : "bg-gray-700"}`}
        >📄 Posted Jobs</button>
        <button
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 rounded ${activeTab === "matches" ? "bg-blue-600" : "bg-gray-700"}`}
        >🎯 Candidate Matches</button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-2 rounded ${activeTab === "analysis" ? "bg-blue-600" : "bg-gray-700"}`}
        >🔍 Resume Analysis</button>
        <button
          onClick={() => setActiveTab("portal")}
          className={`px-4 py-2 rounded ${activeTab === "portal" ? "bg-blue-600" : "bg-gray-700"}`}
        >👤 Candidate Portal</button>
      </div>

      {/* Job Listings */}
      {activeTab === "jobs" && (
        <div>
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
      )}

      {/* Candidate Matches */}
      {activeTab === "matches" && (
        <div>
          {loading && <p>Loading matches...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {Object.keys(matches).length > 0 ? (
            Object.keys(matches).map((jobId) => (
              <div key={jobId} className="p-4 bg-gray-800 rounded-md shadow-md mb-6">
                <h2 className="text-lg font-bold">Candidates for {jobs.find(job => job._id === jobId)?.title || "Job"}</h2>
                {matches[jobId].length > 0 ? (
                  matches[jobId].map((match) => (
                    <div key={match.candidateId} className="border-b border-gray-600 py-2">
                      <p className="text-blue-400">{match.name} - {match.score}% match</p>
                      <p className="text-gray-400">{match.explanation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No candidates found</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No matching candidates available</p>
          )}
        </div>
      )}

      {/* Resume Analysis */}
      {activeTab === "analysis" && <ResumeAnalysis />}

      {/* Candidate Portal */}
      {activeTab === "portal" && <CandidatePortal />}
    </div>
  );
};

export default Dashboard;


/*"use client";
import { useEffect, useState } from "react";
import ResumeAnalysis from "./ResumeAnalysis";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  recruiter: string;
}

interface Match {
  candidateId: string;
  name: string;
  email: string;
  score: number;
  explanation: string;
}

const Dashboard = ({ recruiter, refresh }: { recruiter: string; refresh: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<{ [jobId: string]: Match[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("jobs");

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

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/match");
      if (!res.ok) throw new Error("Failed to load matches");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError("Error loading matches");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    fetchMatches();
  }, [refresh]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-blue-400">Logged in as: {recruiter}</p>

      {/* Tabs */
      /*<div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded ${activeTab === "jobs" ? "bg-blue-600" : "bg-gray-700"}`}
        >
          📄 Posted Jobs
        </button>
        <button
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 rounded ${activeTab === "matches" ? "bg-blue-600" : "bg-gray-700"}`}
        >
          🎯 Candidate Matches
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-2 rounded ${activeTab === "analysis" ? "bg-blue-600" : "bg-gray-700"}`}
        >
          🔍 Resume Analysis
        </button>
      </div>

      {/* Job Listings */
     /* {activeTab === "jobs" && (
        <div>
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
      )}

      {/* Candidate Matches */
     /* {activeTab === "matches" && (
        <div>
          {loading && <p>Loading matches...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {Object.keys(matches).length > 0 ? (
            Object.keys(matches).map((jobId) => (
              <div key={jobId} className="p-4 bg-gray-800 rounded-md shadow-md mb-6">
                <h2 className="text-lg font-bold">Candidates for {jobs.find(job => job._id === jobId)?.title || "Job"}</h2>
                {matches[jobId].length > 0 ? (
                  matches[jobId].map((match) => (
                    <div key={match.candidateId} className="border-b border-gray-600 py-2">
                      <p className="text-blue-400">{match.name} - {match.score}% match</p>
                      <p className="text-gray-400">{match.explanation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No candidates found</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No matching candidates available</p>
          )}
        </div>
      )}

      {/* Resume Analysis */
     /* {activeTab === "analysis" && <ResumeAnalysis />}
    </div>
  );
};

export default Dashboard;

/*"use client";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  recruiter: string;
}

interface Match {
  candidateId: string;
  name: string;
  email: string;
  score: number;
  explanation: string;
}

const Dashboard = ({ recruiter, refresh }: { recruiter: string; refresh: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<{ [jobId: string]: Match[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("jobs");

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

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/match");
      if (!res.ok) throw new Error("Failed to load matches");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError("Error loading matches");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    fetchMatches();
  }, [refresh]);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-blue-400">Logged in as: {recruiter}</p>

      {/* Tab Buttons */
    /*  <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded ${activeTab === "jobs" ? "bg-blue-600" : "bg-gray-700"}`}
        >
          📄 Posted Jobs
        </button>
        <button
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 rounded ${activeTab === "matches" ? "bg-blue-600" : "bg-gray-700"}`}
        >
          🎯 Candidate Matches
        </button>
      </div>

      {/* Job Listings */
   /*   {activeTab === "jobs" && (
        <div>
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
      )}

      {/* Candidate Matches */
     /* {activeTab === "matches" && (
        <div>
          {loading && <p>Loading matches...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {Object.keys(matches).length > 0 ? (
            Object.keys(matches).map((jobId) => (
              <div key={jobId} className="p-4 bg-gray-800 rounded-md shadow-md mb-6">
                <h2 className="text-lg font-bold">Candidates for {jobs.find(job => job._id === jobId)?.title || "Job"}</h2>
                {matches[jobId].length > 0 ? (
                  matches[jobId].map((match) => (
                    <div key={match.candidateId} className="border-b border-gray-600 py-2">
                      <p className="text-blue-400">{match.name} - {match.score}% match</p>
                      <p className="text-gray-400">{match.explanation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No candidates found</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No matching candidates available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;*/





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

export default Dashboard;*/


