

export const analyzeResume = (resume: any, job: any) => {
    const resumeSkills = resume.skills.map((s: string) => s.toLowerCase());
    const jobSkills = job.skills.map((s: string) => s.toLowerCase());
  
    const missingSkills = jobSkills.filter((skill: string) => !resumeSkills.includes(skill));
    const matchScore = ((jobSkills.length - missingSkills.length) / jobSkills.length) * 100;
  
    return {
      matchScore: `${matchScore.toFixed(2)}%`,
      missingSkills,
      suggestions: missingSkills.length
        ? `Consider adding skills like ${missingSkills.join(", ")} to improve your match.`
        : "Your resume is a great match!",
    };
  };
  