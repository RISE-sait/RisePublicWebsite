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
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobApplicationForm } from "@/components/careers";
import { ReCaptchaProvider } from "@/components/providers/recaptcha-provider";
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
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#ffb800]/20 border-t-[#ffb800] rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <p className="text-gray-400 font-medium">Loading position details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
        <SectionContainer className="py-32">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Briefcase className="w-10 h-10 text-gray-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Position Not Found
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              This position may have been filled or is no longer available. Check out our other open positions.
            </p>
            <Link href="/careers">
              <Button className="bg-[#ffb800] text-black hover:bg-[#e0a300] h-12 px-8 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                View All Careers
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
    <ReCaptchaProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <div className="border-b border-white/5">
        <SectionContainer className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ffb800] mb-8 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Careers</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Job Info */}
              <div className="lg:col-span-2">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <Badge className="bg-[#ffb800] text-black font-semibold px-3 py-1 hover:bg-[#e0a300] transition-colors">
                    {formatEmploymentType(job.employment_type)}
                  </Badge>
                  <Badge className="bg-white/10 text-white font-medium px-3 py-1 border border-white/20">
                    {formatLocationType(job.location_type)}
                  </Badge>
                  {job.status === "closed" && (
                    <Badge variant="destructive" className="px-3 py-1">Position Closed</Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  {job.title}
                </h1>
                {job.position && job.position !== job.title && (
                  <p className="text-xl text-gray-400 mb-6">{job.position}</p>
                )}

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Location</span>
                    </div>
                    <span className="text-sm font-medium text-white">{formatLocationType(job.location_type)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Type</span>
                    </div>
                    <span className="text-sm font-medium text-white">{formatEmploymentType(job.employment_type)}</span>
                  </div>
                  {salary && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Salary</span>
                      </div>
                      <span className="text-sm font-medium text-white">{salary}</span>
                    </div>
                  )}
                  {closingDate && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Deadline</span>
                      </div>
                      <span className="text-sm font-medium text-white">{closingDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Quick Apply on Desktop */}
              <div className="hidden lg:block">
                {job.status === "published" && !applicationSubmitted && !showApplicationForm && (
                  <div className="sticky top-8 bg-gradient-to-br from-[#ffb800] to-[#e0a300] rounded-xl p-6 shadow-2xl">
                    <h3 className="text-xl font-bold text-black mb-2">
                      Ready to Apply?
                    </h3>
                    <p className="text-black/70 text-sm mb-4">
                      Join our team and make an impact
                    </p>
                    <Button
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full bg-black text-white hover:bg-gray-900 h-11 font-semibold"
                    >
                      Apply Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Content Section */}
      <SectionContainer className="flex-grow py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content - Single Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10"
            >
              {/* Description */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#ffb800] rounded-full"></span>
                  About This Role
                </h2>
                <div
                  className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-semibold prose-strong:text-white prose-ul:text-gray-300 max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </section>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <section className="mb-10 pb-10 border-b border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#ffb800] rounded-full"></span>
                    What You'll Do
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                        <span className="text-[#ffb800] font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <section className="mb-10 pb-10 border-b border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#ffb800] rounded-full"></span>
                    What We're Looking For
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                        <span className="text-[#ffb800] font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Nice to Have */}
              {job.nice_to_have && job.nice_to_have.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-gray-500 rounded-full"></span>
                    Nice to Have
                  </h2>
                  <ul className="space-y-3">
                    {job.nice_to_have.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-400 leading-relaxed">
                        <span className="text-gray-500 font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </motion.div>

            {/* Sidebar - Application */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-8 space-y-4">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  {applicationSubmitted ? (
                    <div className="text-center py-4">
                      <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        Application Submitted!
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        We'll review your application and be in touch soon.
                      </p>
                    </div>
                  ) : showApplicationForm ? (
                    <>
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                        <h3 className="text-lg font-bold text-white">
                          Application
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowApplicationForm(false)}
                          className="text-gray-400 hover:text-white hover:bg-white/10 h-7 px-2 text-xs"
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
                      {job.status === "published" ? (
                        <>
                          <h3 className="text-lg font-bold text-white mb-2">
                            Ready to Apply?
                          </h3>
                          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                            Join the RISE team and make an impact
                          </p>
                          <Button
                            onClick={() => setShowApplicationForm(true)}
                            className="w-full bg-[#ffb800] text-black hover:bg-[#e0a300] h-11 font-semibold rounded-lg transition-all"
                          >
                            Apply Now
                          </Button>
                          {closingDate && (
                            <p className="text-gray-500 text-xs text-center mt-3 flex items-center justify-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Apply by {closingDate}
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-5 px-4 bg-red-500/10 rounded-lg border border-red-500/20">
                          <p className="text-red-400 font-medium text-sm">
                            Applications Closed
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            No longer accepting applications
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Share Section */}
                {!showApplicationForm && !applicationSubmitted && job.status === "published" && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                    <p className="text-gray-400 text-xs leading-relaxed">
                      <span className="font-medium text-white block mb-1">Know someone perfect for this?</span>
                      Share this opportunity
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Mobile Apply Button */}
      {job.status === "published" && !applicationSubmitted && !showApplicationForm && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10 z-50 shadow-2xl">
          <Button
            onClick={() => {
              setShowApplicationForm(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full bg-[#ffb800] text-black hover:bg-[#e0a300] h-14 text-base font-semibold rounded-xl shadow-lg active:scale-95 transition-transform"
          >
            Apply for This Position
          </Button>
        </div>
      )}
    </div>
    </ReCaptchaProvider>
  );
}
