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
      // eslint-disable-next-line no-console
      console.error("Failed to fetch jobs:", res.statusText);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.jobs || [];
  } catch (error) {
    // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.error("Failed to fetch job:", res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching job:", error);
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
  const url = `${apiBaseUrl}/jobs/${jobId}/apply`;

  // Build FormData with all fields including the resume file
  const formData = new FormData();
  formData.append("first_name", application.first_name);
  formData.append("last_name", application.last_name);
  formData.append("email", application.email);
  formData.append("phone", application.phone);
  formData.append("resume", application.resume); // File field named "resume"

  if (application.cover_letter) {
    formData.append("cover_letter", application.cover_letter);
  }
  if (application.linkedin_url) {
    formData.append("linkedin_url", application.linkedin_url);
  }
  if (application.portfolio_url) {
    formData.append("portfolio_url", application.portfolio_url);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData, // Send as multipart/form-data
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
    // eslint-disable-next-line no-console
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
export function formatEmploymentType(type: string): string {
  const labels: Record<string, string> = {
    "full-time": "Full-time",
    "full_time": "Full-time",
    "part-time": "Part-time",
    "part_time": "Part-time",
    contract: "Contract",
  };
  return labels[type] || type.split(/[-_]/).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('-');
}

/**
 * Format location type for display
 */
export function formatLocationType(type: string): string {
  const labels: Record<string, string> = {
    "on-site": "On-site",
    "on_site": "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
  };
  return labels[type] || type.split(/[-_]/).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('-');
}
