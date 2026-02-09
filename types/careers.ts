// Job Posting Types
export type EmploymentType = "full-time" | "part-time" | "contract";
export type LocationType = "on-site" | "remote" | "hybrid";
export type JobStatus = "draft" | "published" | "closed" | "archived";

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  show: boolean;
}

export interface JobPosting {
  id: string;
  title: string;
  position: string;
  employment_type: EmploymentType;
  location_type: LocationType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_have?: string[];
  salary_range?: SalaryRange;
  status: JobStatus;
  closing_date?: string;
  created_by: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface JobListingResponse {
  jobs: JobPosting[];
  total: number;
  page: number;
  page_size: number;
}

// Job Application Types
export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "interview"
  | "offered"
  | "hired"
  | "rejected";

export interface JobApplication {
  id: string;
  job_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  status: ApplicationStatus;
  internal_notes?: string;
  rating?: number;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationSubmission {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume: File;
  cover_letter?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  recaptchaToken?: string;
}

export interface ApplicationListResponse {
  applications: JobApplication[];
  total: number;
  page: number;
  page_size: number;
}

// Filter types for job listings
export interface JobFilters {
  employment_type?: EmploymentType;
  location_type?: LocationType;
  search?: string;
}
