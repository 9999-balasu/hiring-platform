import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary?: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editJob, setEditJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Job deleted successfully!");
        fetchJobs(); // Refresh list
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const updateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return; // ✅ Fix: Ensure editJob is not null

    try {
      const response = await fetch(`/api/jobs?id=${editJob._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editJob),
      });

      if (response.ok) {
        alert("Job updated successfully!");
        setEditJob(null);
        fetchJobs();
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>

      {editJob && (
        <form onSubmit={updateJob} className="p-4 border rounded">
          <input
            type="text"
            name="title"
            value={editJob.title}
            onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
            className="block w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="company"
            value={editJob.company}
            onChange={(e) => setEditJob({ ...editJob, company: e.target.value })}
            className="block w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={editJob.description}
            onChange={(e) =>
              setEditJob({ ...editJob, description: e.target.value })
            }
            className="block w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={editJob.location}
            onChange={(e) => setEditJob({ ...editJob, location: e.target.value })}
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="salary"
            value={editJob.salary || ""}
            onChange={(e) => setEditJob({ ...editJob, salary: e.target.value })}
            className="block w-full p-2 mb-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Update Job
          </button>
        </form>
      )}

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="p-4 border rounded mb-2 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.salary ? `$${job.salary}` : "Salary not specified"}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteJob(job._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditJob(job)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
