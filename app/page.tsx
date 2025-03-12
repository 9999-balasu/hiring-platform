/*import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
    </div>
  );
}*/


import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Hiring Platform</h1>
        <p className="text-lg text-gray-600 mt-2">
          Find your dream job or post job listings easily.
        </p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6">
        <Image
          src="/job-search.svg" // Ensure you have an image in the public folder
          width={300}
          height={300}
          alt="Job Search Illustration"
        />
        <div className="flex gap-4">
          <Link href="/jobs">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Browse Jobs
            </button>
          </Link>
          <Link href="/register">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Hiring Platform. All rights reserved.
      </footer>
    </div>
  );
}
