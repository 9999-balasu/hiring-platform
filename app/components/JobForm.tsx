
"use client";
import { useState } from "react";

const JobForm = ({ recruiter, onJobPosted }: { recruiter: string; onJobPosted?: () => void }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/jobs/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, company, location, recruiter }),
    });

    if (response.ok) {
      alert("✅ Job posted successfully!");
      setTitle("");
      setCompany("");
      setLocation("");

      // ✅ Dynamically refresh dashboard
      onJobPosted?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white border border-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Post a Job</h2>
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button className="w-full bg-blue-600 text-white p-2 rounded">🚀 Post Job</button>
    </form>
  );
};

export default JobForm;

/*"use client";
import { useState } from "react";

const JobForm = ({ recruiter }: { recruiter: string }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch("/api/jobs/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, company, location, recruiter }),
    });
  
    if (response.ok) {
      alert("✅ Job posted successfully!");
      setTitle("");
      setCompany("");
      setLocation("");
  
      // ✅ Force Dashboard to Reload
      window.location.reload(); 
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white border border-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Post a Job</h2>
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button className="w-full bg-blue-600 text-white p-2 rounded">🚀 Post Job</button>
    </form>
  );
};

export default JobForm;


/*import { useState } from "react";

const JobForm = ({ recruiter }: { recruiter: string }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/jobs/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, company, location, recruiter }),
    });

    if (response.ok) {
      alert("✅ Job posted successfully!");
      setTitle("");
      setCompany("");
      setLocation("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white border border-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Post a Job</h2>
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button className="w-full bg-blue-600 text-white p-2 rounded">🚀 Post Job</button>
    </form>
  );
};

export default JobForm;*/



/*"use client";
import { useState } from "react";

const JobForm = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [recruiter, setRecruiter] = useState(""); // New field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/jobs/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company, location, recruiter }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("✅ Job posted successfully!");
        setTitle("");
        setCompany("");
        setLocation("");
        setRecruiter("");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to post job.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white border border-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Post a Job</h2>

      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input className="w-full p-2 mb-2 bg-gray-800 border-gray-700 rounded" type="text" placeholder="Recruiter Name" value={recruiter} onChange={(e) => setRecruiter(e.target.value)} required />

      <button className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? "Posting..." : "🚀 Post Job"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default JobForm;*/

