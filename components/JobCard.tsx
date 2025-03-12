
// components/JobCard.tsx
type Job = {
  id: string;        // Add the 'id' property
  title: string;
  company: string;
  location: string;
  userId?: string;   // Optional if needed
};

interface JobCardProps {
  job: Job;
  userId: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, userId }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>
    </div>
  );
};

export default JobCard;
