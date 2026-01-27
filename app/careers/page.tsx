"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, TrendingUp, Loader2 } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { JobCard, JobFilters } from "@/components/careers";
import { getJobs } from "@/services/careers";
import { JobPosting, JobFilters as JobFiltersType } from "@/types/careers";

const benefits = [
  {
    icon: Briefcase,
    title: "Competitive Pay",
    description: "We offer competitive salaries and comprehensive benefits packages.",
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work alongside passionate professionals who share your drive for excellence.",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement opportunities for all team members.",
  },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFiltersType>({});

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (filters.employment_type && job.employment_type !== filters.employment_type) {
        return false;
      }
      if (filters.location_type && job.location_type !== filters.location_type) {
        return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(searchLower);
        const matchesPosition = job.position?.toLowerCase().includes(searchLower);
        const matchesDescription = job.description.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesPosition && !matchesDescription) {
          return false;
        }
      }
      return true;
    });
  }, [jobs, filters]);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-black pt-28 pb-4">
        <SectionContainer animate={false} className="py-0">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Join Our Team
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Be part of something bigger. We need passionate people like you.
            </p>
          </div>
        </SectionContainer>
      </div>

      {/* Why Join Us Section */}
      <SectionContainer className="bg-black">
        <SectionHeading
          title="WHY JOIN RISE"
          subtitle="More than a job, it's a lifestyle"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 border border-white/10 rounded-lg p-6 text-center hover:border-[#ffb800]/50 transition-colors"
            >
              <div className="w-16 h-16 bg-[#ffb800]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-[#ffb800]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Open Positions Section */}
      <SectionContainer className="bg-gradient-to-b from-black to-zinc-900">
        <SectionHeading
          title="OPEN POSITIONS"
          subtitle="Find your perfect role"
          centered
        />

        {/* Filters */}
        <JobFilters filters={filters} onFiltersChange={setFilters} />

        {/* Job Listings */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#ffb800] animate-spin" />
            <span className="ml-3 text-gray-400">Loading positions...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {jobs.length === 0
                ? "No Open Positions"
                : "No Matching Positions"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {jobs.length === 0
                ? "We don't have any open positions at the moment, but check back soon! We're always growing."
                : "No positions match your current filters. Try adjusting your search criteria."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredJobs.length > 0 && (
          <p className="text-center text-gray-500 mt-8">
            Showing {filteredJobs.length} of {jobs.length} positions
          </p>
        )}
      </SectionContainer>

      {/* CTA Section */}
      <ParallaxSection
        bgImage="/careers-page-images/team.svg"
        overlayOpacity={0.85}
        className="py-24"
      >
        <SectionContainer animate={false}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t See the Right Fit?
            </h2>
            <p className="text-gray-300 mb-6">
              We&apos;re always looking for talented individuals. Send us your
              resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@risesportscomplex.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#ffb800] text-black font-semibold rounded-md hover:bg-[#e0a300] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
