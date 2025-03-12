
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"recruiter" | "candidate">("candidate"); // Default role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/register",
        { name, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Register API Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full mb-3 text-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-3 text-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full mb-3 text-gray-700"
        />
        
        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "recruiter" | "candidate")}
          className="border p-2 w-full mb-3 text-gray-700"
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;


/*"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
  
    try {
      const response = await axios.post(
        "/api/auth/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("API Response:", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Register API Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Something went wrong");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full mb-3 text-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-3 text-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full mb-3 text-gray-700"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;*/






