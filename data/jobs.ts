import type { Job } from '../types';

export const ALL_JOBS: Job[] = [
  // Education
  { title: 'Preschool', type: 'education', salary: 0, description: 'Learn your ABCs and 123s.', requirements: { ageMin: 3, ageMax: 5 } },
  { title: 'Elementary School', type: 'education', salary: 0, description: 'Basic education.', requirements: { ageMin: 6, ageMax: 11 } },
  { title: 'Middle School', type: 'education', salary: 0, description: 'Navigating the awkward years.', requirements: { ageMin: 12, ageMax: 14 } },
  { title: 'High School', type: 'education', salary: 0, description: 'Prepare for the future.', requirements: { ageMin: 15, ageMax: 17 } },
  
  // Part-time Jobs
  { title: 'Babysitter', type: 'part-time', salary: 200, description: 'Watch over neighborhood kids.', requirements: { ageMin: 14 } },
  { title: 'Newspaper Deliverer', type: 'part-time', salary: 150, description: 'Toss papers onto porches.', requirements: { ageMin: 12 } },
  { title: 'Fast Food Worker', type: 'part-time', salary: 400, description: 'Flip burgers and handle the fryer.', requirements: { ageMin: 16 } },
  { title: 'Barista', type: 'part-time', salary: 450, description: 'Serve coffee with a smile.', requirements: { ageMin: 16 } },
  { title: 'Retail Clerk', type: 'part-time', salary: 500, description: 'Fold clothes and manage the cash register.', requirements: { ageMin: 16 } },

  // Full-time Jobs (Entry Level)
  { title: 'Janitor', type: 'full-time', salary: 1800, description: 'Keep the floors clean and the building tidy.', requirements: { ageMin: 18, education: 'High School' } },
  { title: 'Receptionist', type: 'full-time', salary: 2200, description: 'Answer phones and greet visitors.', requirements: { ageMin: 18, education: 'High School' } },
  { title: 'Mail Carrier', type: 'full-time', salary: 2500, description: 'Neither snow nor rain nor heat nor gloom of night...', requirements: { ageMin: 18, education: 'High School' } },
  
  // Full-time Jobs (Skilled)
  { title: 'Software Engineer', type: 'full-time', salary: 6000, description: 'Write code and solve complex problems.', requirements: { ageMin: 22, smartsMin: 80, education: 'University' } },
  { title: 'Doctor', type: 'full-time', salary: 15000, description: 'Diagnose and treat patients.', requirements: { ageMin: 28, smartsMin: 90, education: 'Medical School' } },
  { title: 'Lawyer', type: 'full-time', salary: 12000, description: 'Represent clients in legal matters.', requirements: { ageMin: 26, smartsMin: 85, education: 'Law School' } },
];
