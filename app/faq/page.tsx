"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  Clock,
  MapPin,
  CreditCard,
  Users,
  Shield,
  Home,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What are your facility's hours of operation?",
    answer:
      "Our facility welcomes you every day from 9:00 AM to 11:00 PM, providing ample time for practice, play, and training sessions.",
    category: "General",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: "2",
    question: "Do you offer drop in access or is membership required?",
    answer:
      "We offer flexible drop‑in access for non‑members at a daily rate. Simply stop by the front desk to purchase a pass and enjoy full facility privileges without a membership commitment.",
    category: "Membership",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "3",
    question: "How do I purchase a membership?",
    answer:
      "You can sign up online through our Glofox portal, or visit us in person - our friendly staff will guide you through the process at the front desk.",
    category: "Membership",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "4",
    question: "Where are you located and is there on site parking?",
    answer:
      "Find us at 401 33 Street NE. We offer complimentary on site parking to make your visit as convenient as possible.",
    category: "Location",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: "5",
    question: "Do you offer a free trial or guest pass?",
    answer:
      "We encourage prospective members to tour our facility and enjoy a complimentary trial pass. Contact us to schedule your guest visit and experience everything we offer.",
    category: "Membership",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "6",
    question: "When is my membership automatically renewed, and how will I be billed?",
    answer:
      "Memberships renew automatically according to your chosen plan monthly, quarterly, or annually. Billing is processed securely through our Glofox portal using your saved payment method, and you can update your renewal preferences anytime in your account settings.",
    category: "Billing",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "7",
    question: "Are there changing rooms on site?",
    answer:
      "Yes, we provide spacious on site changing rooms equipped to ensure your comfort before and after your workout.",
    category: "Facilities",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "8",
    question: "Do you have on site first aid or AEDs?",
    answer:
      "Safety is our priority. Our facility is equipped with first aid kits and Automated External Defibrillators (AEDs), and our staff are trained to assist in case of any medical emergency.",
    category: "Safety",
    icon: <Shield className="h-5 w-5" />,
  },
];

const categories = [
  "All",
  "General",
  "Membership",
  "Billing",
  "Facilities",
  "Location",
  "Safety",
];

function FAQAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#111] to-black border border-[#ffb800]/20 rounded-xl overflow-hidden shadow-lg hover:shadow-[#ffb800]/10 transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-[#ffb800]/5 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="text-[#ffb800]">{item.icon}</div>
          <h3 className="text-lg font-semibold text-white pr-4">
            {item.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#ffb800] flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="pl-9">
                <p className="text-gray-300 leading-relaxed">
                  {item.answer.includes("Glofox portal") ? (
                    <>
                      You can sign up online through our{" "}
                      <Link
                        href="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                        className="text-[#ffb800] underline hover:text-[#e0a300] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Glofox portal
                      </Link>
                      , or visit us in person - our friendly staff will guide you
                      through the process at the front desk.
                    </>
                  ) : (
                    item.answer
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFAQs.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative bg-gradient-to-b from-[#ffb800]/20 to-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Frequently Asked {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb800] to-[#e0a300]">
              Questions
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Find answers to common questions about RISE basketball facility,
            memberships, and services.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-[#ffb800]/30 text-white placeholder-gray-400 focus:border-[#ffb800]"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[#ffb800] text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="text-sm text-[#ffb800] hover:text-[#e0a300] transition-colors"
              >
                Expand All
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={collapseAll}
                className="text-sm text-[#ffb800] hover:text-[#e0a300] transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No FAQs found matching your search.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FAQAccordion
                  item={item}
                  isOpen={openItems.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-[#111] rounded-2xl p-8 border border-[#ffb800]/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our friendly staff is here to
            help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#ffb800] hover:bg-[#e0a300] text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="bg-transparent border border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}