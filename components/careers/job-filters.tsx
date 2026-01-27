"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobFilters as JobFiltersType } from "@/types/careers";

interface JobFiltersProps {
  filters: JobFiltersType;
  onFiltersChange: (filters: JobFiltersType) => void;
}

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleEmploymentTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      employment_type: value === "all" ? undefined : (value as JobFiltersType["employment_type"]),
    });
  };

  const handleLocationTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      location_type: value === "all" ? undefined : (value as JobFiltersType["location_type"]),
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.search || filters.employment_type || filters.location_type;

  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-4 md:p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search positions..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
          />
        </div>

        {/* Employment Type Filter */}
        <Select
          value={filters.employment_type || "all"}
          onValueChange={handleEmploymentTypeChange}
        >
          <SelectTrigger className="bg-black/50 border-white/20 text-white focus:ring-[#ffb800]">
            <SelectValue placeholder="Employment Type" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/20">
            <SelectItem value="all" className="text-white hover:bg-white/10">
              All Types
            </SelectItem>
            <SelectItem value="full-time" className="text-white hover:bg-white/10">
              Full-time
            </SelectItem>
            <SelectItem value="part-time" className="text-white hover:bg-white/10">
              Part-time
            </SelectItem>
            <SelectItem value="contract" className="text-white hover:bg-white/10">
              Contract
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Location Type Filter */}
        <Select
          value={filters.location_type || "all"}
          onValueChange={handleLocationTypeChange}
        >
          <SelectTrigger className="bg-black/50 border-white/20 text-white focus:ring-[#ffb800]">
            <SelectValue placeholder="Location Type" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/20">
            <SelectItem value="all" className="text-white hover:bg-white/10">
              All Locations
            </SelectItem>
            <SelectItem value="on-site" className="text-white hover:bg-white/10">
              On-site
            </SelectItem>
            <SelectItem value="remote" className="text-white hover:bg-white/10">
              Remote
            </SelectItem>
            <SelectItem value="hybrid" className="text-white hover:bg-white/10">
              Hybrid
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
