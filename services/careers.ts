import {
  JobPosting,
  JobFilters,
  ApplicationSubmission,
  JobApplication,
} from "@/types/careers";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * Get all published job postings (public endpoint)
 */
export async function getJobs(filters?: JobFilters): Promise<JobPosting[]> {
  const params = new URLSearchParams();

  if (filters?.employment_type) {
    params.append("employment_type", filters.employment_type);
  }
  if (filters?.location_type) {
    params.append("location_type", filters.location_type);
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const queryString = params.toString();
  const url = `${apiBaseUrl}/jobs${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch jobs:", res.statusText);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.jobs || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

/**
 * Get a single job posting by ID (public endpoint)
 */
export async function getJobById(id: string): Promise<JobPosting | null> {
  const url = `${apiBaseUrl}/jobs/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch job:", res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

/**
 * Upload resume file and get URL
 */
export async function uploadResume(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${apiBaseUrl}/jobs/upload-resume`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Failed to upload resume:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.url || data.resume_url;
  } catch (error) {
    console.error("Error uploading resume:", error);
    return null;
  }
}

/**
 * Submit a job application (public endpoint)
 */
export async function submitApplication(
  jobId: string,
  application: ApplicationSubmission
): Promise<{ success: boolean; message: string; application?: JobApplication }> {
  // First, upload the resume
  const resumeUrl = await uploadResume(application.resume);
  if (!resumeUrl) {
    return {
      success: false,
      message: "Failed to upload resume. Please try again.",
    };
  }

  const url = `${apiBaseUrl}/jobs/${jobId}/apply`;

  const payload = {
    first_name: application.first_name,
    last_name: application.last_name,
    email: application.email,
    phone: application.phone,
    resume_url: resumeUrl,
    cover_letter: application.cover_letter || undefined,
    linkedin_url: application.linkedin_url || undefined,
    portfolio_url: application.portfolio_url || undefined,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to submit application. Please try again.",
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: "Application submitted successfully!",
      application: data,
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
}

/**
 * Validate file type and size for resume upload
 */
export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload a PDF, DOC, or DOCX file.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum file size is 5MB.",
    };
  }

  return { valid: true };
}

/**
 * Format salary range for display
 */
export function formatSalaryRange(
  salary?: JobPosting["salary_range"]
): string | null {
  if (!salary || !salary.show) return null;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: salary.currency || "USD",
    maximumFractionDigits: 0,
  });

  return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
}

/**
 * Format employment type for display
 */
export function formatEmploymentType(type: JobPosting["employment_type"]): string {
  const labels: Record<JobPosting["employment_type"], string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
  };
  return labels[type] || type;
}

/**
 * Format location type for display
 */
export function formatLocationType(type: JobPosting["location_type"]): string {
  const labels: Record<JobPosting["location_type"], string> = {
    "on-site": "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
  };
  return labels[type] || type;
}
