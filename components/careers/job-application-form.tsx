"use client";

declare global {
  interface Window {
    grecaptcha?: any;
    onJobApplicationCaptcha?: (token: string) => void;
  }
}

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import {
  Upload,
  FileText,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ApplicationSubmission } from "@/types/careers";
import { submitApplication, validateResumeFile } from "@/services/careers";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onSuccess?: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function JobApplicationForm({
  jobId,
  jobTitle,
  onSuccess,
}: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    linkedin_url: "",
    portfolio_url: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Setup reCAPTCHA Enterprise v2
  useEffect(() => {
    window.onJobApplicationCaptcha = (token: string) => {
      setCaptchaToken(token);
    };

    const interval = setInterval(() => {
      const container = document.querySelector(".g-recaptcha-job-application");
      if (window.grecaptcha?.enterprise && container && !container.hasChildNodes()) {
        clearInterval(interval);
        window.grecaptcha.enterprise.render(container, {
          sitekey: SITE_KEY,
          callback: "onJobApplicationCaptcha",
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (file) {
      const validation = validateResumeFile(file);
      if (!validation.valid) {
        setFileError(validation.error || "Invalid file");
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    setFileError(null);

    if (file) {
      const validation = validateResumeFile(file);
      if (!validation.valid) {
        setFileError(validation.error || "Invalid file");
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      setFileError("Please upload your resume");
      return;
    }

    if (!captchaToken) {
      setErrorMessage('Please check the "I\'m not a robot" box.');
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const submission: ApplicationSubmission = {
        ...formData,
        resume: resumeFile,
        recaptchaToken: captchaToken,
      };

      const result = await submitApplication(jobId, submission);

      if (result.success) {
        setStatus("success");
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(result.message);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      // Reset reCAPTCHA
      window.grecaptcha?.enterprise?.reset();
      setCaptchaToken(null);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/50 border border-green-500/30 rounded-lg p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Application Submitted!
        </h3>
        <p className="text-gray-300 mb-4">
          Thank you for applying to the {jobTitle} position. We&apos;ve received
          your application and will review it shortly.
        </p>
        <p className="text-gray-400 text-sm">
          You will receive a confirmation email at {formData.email}
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Load reCAPTCHA Enterprise script */}
      <Script
        src="https://www.google.com/recaptcha/enterprise.js"
        strategy="afterInteractive"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-white">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-white">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">
            Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Resume Upload */}
      <div className="space-y-2">
        <Label className="text-white">
          Resume <span className="text-red-500">*</span>
        </Label>
        <div
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${
              resumeFile
                ? "border-green-500/50 bg-green-500/10"
                : fileError
                ? "border-red-500/50 bg-red-500/10"
                : "border-white/20 hover:border-[#ffb800]/50 hover:bg-[#ffb800]/5"
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
          />

          {resumeFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-green-500" />
              <div className="text-left">
                <p className="text-white font-medium">{resumeFile.name}</p>
                <p className="text-gray-400 text-sm">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300 mb-1">
                Drag and drop your resume here, or click to browse
              </p>
              <p className="text-gray-500 text-sm">
                PDF, DOC, or DOCX (max 5MB)
              </p>
            </>
          )}
        </div>
        {fileError && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {fileError}
          </p>
        )}
      </div>

      {/* Cover Letter */}
      <div className="space-y-2">
        <Label htmlFor="cover_letter" className="text-white">
          Cover Letter <span className="text-gray-500">(optional)</span>
        </Label>
        <Textarea
          id="cover_letter"
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleInputChange}
          rows={6}
          className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800] resize-none"
          placeholder="Tell us why you'd be a great fit for this role..."
        />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="text-white">
            LinkedIn URL <span className="text-gray-500">(optional)</span>
          </Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            value={formData.linkedin_url}
            onChange={handleInputChange}
            className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio_url" className="text-white">
            Portfolio URL <span className="text-gray-500">(optional)</span>
          </Label>
          <Input
            id="portfolio_url"
            name="portfolio_url"
            type="url"
            value={formData.portfolio_url}
            onChange={handleInputChange}
            className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-[#ffb800]"
            placeholder="https://portfolio.com"
          />
        </div>
      </div>

      {/* reCAPTCHA */}
      <div className="flex justify-center">
        <div className="g-recaptcha-job-application"></div>
      </div>

      {/* Error Message */}
      {status === "error" && errorMessage && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-400 text-sm">{errorMessage}</p>
            <p className="text-gray-500 text-xs mt-1">Please check your information and try again.</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#ffb800] text-black hover:bg-[#e0a300] h-12 text-lg font-semibold"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting Application...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

      <p className="text-gray-500 text-sm text-center">
        By submitting this application, you agree to our privacy policy and
        terms of service.
      </p>
    </form>
    </>
  );
}
