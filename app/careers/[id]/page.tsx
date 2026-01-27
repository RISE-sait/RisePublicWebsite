"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Loader2,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplicationForm } from "@/components/careers";
import { getJobById } from "@/services/careers";
import {
  formatEmploymentType,
  formatLocationType,
  formatSalaryRange,
} from "@/services/careers";
import { JobPosting } from "@/types/careers";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      if (!jobId) return;
      setLoading(true);
      const data = await getJobById(jobId);
      setJob(data);
      setLoading(false);
    }
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ffb800] animate-spin" />
        <span className="ml-3 text-gray-400">Loading job details...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black">
        <SectionContainer className="py-32">
          <div className="text-center">
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Job Not Found
            </h1>
            <p className="text-gray-400 mb-8">
              This position may have been filled or is no longer available.
            </p>
            <Link href="/careers">
              <Button className="bg-[#ffb800] text-black hover:bg-[#e0a300]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </Button>
            </Link>
          </div>
        </SectionContainer>
      </div>
    );
  }

  const salary = formatSalaryRange(job.salary_range);
  const closingDate = job.closing_date
    ? new Date(job.closing_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <ParallaxSection
        bgImage="/careers-page-images/job-detail-hero.svg"
        overlayOpacity={0.85}
        className="py-24 md:py-32"
      >
        <SectionContainer animate={false}>
          <div className="max-w-4xl">
            {/* Back Button */}
            <Link
              href="/careers"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Positions
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-[#ffb800] text-black">
                {formatEmploymentType(job.employment_type)}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {formatLocationType(job.location_type)}
              </Badge>
              {job.status === "closed" && (
                <Badge variant="destructive">Position Closed</Badge>
              )}
            </div>

            {/* Title */}
            <AnimatedText
              text={job.title}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
              animation="reveal"
            />
            {job.position && job.position !== job.title && (
              <p className="text-xl text-gray-400">{job.position}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mt-6 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ffb800]" />
                <span>{formatLocationType(job.location_type)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#ffb800]" />
                <span>{formatEmploymentType(job.employment_type)}</span>
              </div>
              {salary && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#ffb800]" />
                  <span>{salary}</span>
                </div>
              )}
              {closingDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#ffb800]" />
                  <span>Apply by {closingDate}</span>
                </div>
              )}
            </div>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Content Section */}
      <SectionContainer className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[#ffb800] mb-4">
                About This Role
              </h2>
              <div
                className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </motion.div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-[#ffb800] mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ffb800] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-[#ffb800] mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ffb800] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Nice to Have */}
            {job.nice_to_have && job.nice_to_have.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-[#ffb800] mb-4">
                  Nice to Have
                </h2>
                <ul className="space-y-3">
                  {job.nice_to_have.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Application */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8"
            >
              <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                {applicationSubmitted ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Thank you for your interest. We&apos;ll be in touch soon.
                    </p>
                  </div>
                ) : showApplicationForm ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">
                        Apply Now
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApplicationForm(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                    <JobApplicationForm
                      jobId={jobId}
                      jobTitle={job.title}
                      onSuccess={() => setApplicationSubmitted(true)}
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Interested in This Role?
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Submit your application and join our growing team at RISE.
                    </p>
                    {job.status === "published" ? (
                      <Button
                        onClick={() => setShowApplicationForm(true)}
                        className="w-full bg-[#ffb800] text-black hover:bg-[#e0a300] h-12 text-lg font-semibold"
                      >
                        Apply for This Position
                      </Button>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-400">
                          This position is no longer accepting applications.
                        </p>
                      </div>
                    )}

                    {closingDate && job.status === "published" && (
                      <p className="text-gray-500 text-sm text-center mt-4">
                        Application deadline: {closingDate}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Share Section */}
              <div className="mt-6 bg-black/30 border border-white/5 rounded-lg p-4">
                <p className="text-gray-500 text-sm text-center">
                  Know someone perfect for this role? Share it with them!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Mobile Apply Button */}
      {job.status === "published" && !applicationSubmitted && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-black/95 border-t border-white/10 z-50">
          <Button
            onClick={() => {
              setShowApplicationForm(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full bg-[#ffb800] text-black hover:bg-[#e0a300] h-12 text-lg font-semibold"
          >
            Apply Now
          </Button>
        </div>
      )}
    </div>
  );
}
