"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobPosting } from "@/types/careers";
import {
  formatEmploymentType,
  formatLocationType,
  formatSalaryRange,
} from "@/services/careers";

interface JobCardProps {
  job: JobPosting;
  index?: number;
}

export function JobCard({ job, index = 0 }: JobCardProps) {
  const salary = formatSalaryRange(job.salary_range);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-black/50 border-white/10 hover:border-[#ffb800]/50 transition-all duration-300 h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-[#ffb800] text-black hover:bg-[#e0a300]">
              {formatEmploymentType(job.employment_type)}
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              {formatLocationType(job.location_type)}
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-white">{job.title}</h3>
          {job.position && job.position !== job.title && (
            <p className="text-gray-400 text-sm">{job.position}</p>
          )}
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {job.description.replace(/<[^>]*>/g, "").slice(0, 200)}...
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ffb800]" />
              <span>{formatLocationType(job.location_type)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffb800]" />
              <span>{formatEmploymentType(job.employment_type)}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#ffb800]" />
                <span>{salary}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-white/10">
          <Link href={`/careers/${job.id}`} className="w-full">
            <Button className="w-full bg-[#ffb800] text-black hover:bg-[#e0a300] group">
              View Details
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
