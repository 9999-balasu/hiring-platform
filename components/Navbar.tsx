/*import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">Hiring Platform</Link>
        <div>
          <Link href="/jobs" className="mr-4">Jobs</Link>
          <Link href="/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/profile" className="mr-4">Profile</Link>
          <Link href="/login" className="mr-4">Login</Link>
          <Link href="/register" className="mr-4">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;*/



import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">Hiring Platform</Link>
        <div>
          <Link href="/jobs" className="mr-4">Jobs</Link>
          <Link href="/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/profile" className="mr-4">Profile</Link>
          <Link href="/login" className="mr-4">Login</Link>
          <Link href="/register" className="mr-4">Register</Link>
          <Link href="/resume" className="mr-4">Resume</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

