
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import JobForm from "@/components/JobForm";
import JobCard from "@/components/JobCard";
import ApplicationForm from "@/components/ApplicationForm";
import "./globals.css";
import { useState } from "react";
import Dashboard from "@/components/Dashboard"; 
import ResumeUpload from "@/components/ResumeUpload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false); // ✅ State to trigger re-fetch

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <SearchBar onSearch={handleSearch} />

        <div className="container mx-auto p-4">
          {/* ✅ Pass onJobPosted to refresh Dashboard dynamically */}
          <JobForm recruiter="some_recruiter_id" onJobPosted={() => setRefresh(prev => !prev)} />
          <Dashboard recruiter="example@company.com" refresh={refresh} />

          <JobCard
            job={{
              id: "1",
              title: "Software Engineer",
              company: "Tech Corp",
              location: "Remote",
              userId: "123",
            }}
            userId="123"
          />

          <ApplicationForm />
          <ResumeUpload/>
        </div>

        {children}
      </body>
    </html>
  );
}

/*
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import JobForm from "@/components/JobForm";
import JobCard from "@/components/JobCard";
import ApplicationForm from "@/components/ApplicationForm";
import "./globals.css";
import { useState } from "react";
import Dashboard from "@/components/Dashboard"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the Job type for this file (should match the one in JobCard.tsx)
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  userId: string;
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false); // ✅ Add refresh state

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <SearchBar onSearch={handleSearch} />

        <div className="container mx-auto p-4">
          {/* Pass setRefresh to trigger a dashboard refresh when a job is posted */
         /* <JobForm recruiter="some_recruiter_id" onJobPosted={() => setRefresh(prev => !prev)} /> 
          <Dashboard recruiter="example@company.com" refresh={refresh} /> {/* ✅ Fixed */

         /* <JobCard
            job={{
              id: "1",
              title: "Software Engineer",
              company: "Tech Corp",
              location: "Remote",
              userId: "123",
            }}
            userId="123"
          />

          <ApplicationForm />
        </div>

        {children}
      </body>
    </html>
  );
}


/*export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <SearchBar onSearch={handleSearch} />

        <div className="container mx-auto p-4">
        <JobForm recruiter="some_recruiter_id" />
        <Dashboard recruiter="example@company.com" />

          {/* Pass the job object with an `id` property */
         /* <JobCard
            job={{
              id: "1",
              title: "Software Engineer",
              company: "Tech Corp",
              location: "Remote",
              userId: "123",
            }}
            userId="123"
          />

          <ApplicationForm />
        </div>

        {children}
      </body>
    </html>
  );
}*/
