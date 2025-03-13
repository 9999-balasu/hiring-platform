"use client";
import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    education: "",
    resume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/candidate/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (response.ok) alert("Profile saved!");
    else alert("Error saving profile");
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Candidate Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="p-2 bg-gray-800 rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-2 bg-gray-800 rounded" />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} required className="p-2 bg-gray-800 rounded" />
        <input type="number" name="experience" placeholder="Experience (Years)" onChange={handleChange} required className="p-2 bg-gray-800 rounded" />
        <input type="text" name="education" placeholder="Education" onChange={handleChange} required className="p-2 bg-gray-800 rounded" />
        <button type="submit" className="bg-blue-600 p-2 rounded">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
