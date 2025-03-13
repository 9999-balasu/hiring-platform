"use client";

/*import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", formData);
    // Handle login logic
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;*/



/*import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with:", email, password);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;*/


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

    setTimeout(() => {
      alert("Login successful! Redirecting...");
      router.push("/dashboard"); // Redirect to Dashboard or Home
    }, 1000);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-96 mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2 rounded text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            console.log("Typing Email:", e.target.value); // Debugging
            setEmail(e.target.value);
          }}
          required
        />
        <input
          className="border p-2 w-full mb-4 rounded text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            console.log("Typing Password:", e.target.value);
            setPassword(e.target.value);
          }}
          required
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="mt-3 text-center text-sm">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">Register</a>
      </p>
    </div>
  );
};

export default Login;


