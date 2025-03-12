





"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", { name, email, password });

    setTimeout(() => {
      alert("Registration successful! Redirecting to login...");
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-96 mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2 rounded text-black"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            console.log("Typing Name:", e.target.value); // Debugging
            setName(e.target.value);
          }}
          required
        />
        <input
          className="border p-2 w-full mb-2 rounded text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            console.log("Typing Email:", e.target.value);
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
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="mt-3 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  );
};

export default Register;
