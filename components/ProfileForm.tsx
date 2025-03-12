import { useState } from 'react';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio }),
    });

    if (response.ok) {
      alert("Profile updated!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
      <input className="block border p-2 mb-2 w-full" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea className="block border p-2 mb-2 w-full" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
      <button className="bg-blue-600 text-white px-4 py-2 w-full">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
