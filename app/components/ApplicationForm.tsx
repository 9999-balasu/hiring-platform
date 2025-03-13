import { useState } from 'react';

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return alert("Please upload a resume!");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    const response = await fetch('/api/application/submit', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert("Application submitted!");
      setName('');
      setEmail('');
      setResume(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
      <input className="block border p-2 mb-2 w-full" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="block border p-2 mb-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="block border p-2 mb-2 w-full" type="file" onChange={handleFileChange} required />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">Apply</button>
    </form>
  );
};

export default ApplicationForm;
