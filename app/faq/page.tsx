// app/faq/page.tsx or pages/faq.tsx
"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqData } from "@/lib/faqData";
import { Input } from "@/components/ui/input";
import FAQAccordion from "@/components/FAQAccordion";

const categories = ["All", "General", "Membership", "Billing", "Facilities", "Location", "Safety"];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    newOpen.has(id) ? newOpen.delete(id) : newOpen.add(id);
    setOpenItems(newOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative bg-gradient-to-b from-[#ffb800]/20 to-black py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-[#ffb800] to-[#e0a300] bg-clip-text text-transparent">
            Questions
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Find answers to common questions about RISE basketball facility, memberships, and services.
        </motion.p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Search & Filter */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-[#ffb800]/30 text-white placeholder-gray-400 focus:border-[#ffb800]"
            />
          </div>

          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === cat
                      ? "bg-[#ffb800] text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setOpenItems(new Set(filteredFAQs.map((f) => f.id)))} className="text-sm text-[#ffb800] hover:text-[#e0a300]">
                Expand All
              </button>
              <span className="text-gray-600">|</span>
              <button onClick={() => setOpenItems(new Set())} className="text-sm text-[#ffb800] hover:text-[#e0a300]">
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No FAQs found matching your search.</p>
          ) : (
            filteredFAQs.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <FAQAccordion item={item} isOpen={openItems.has(item.id)} onToggle={() => toggleItem(item.id)} />
              </motion.div>
            ))
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-[#111] rounded-2xl p-8 border border-[#ffb800]/20"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">Can't find what you're looking for? Our friendly staff is here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#ffb800] hover:bg-[#e0a300] text-black font-semibold px-8 py-4 rounded-lg">
              Contact Us
            </Link>
            <Link href="/" className="border border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-semibold px-8 py-4 rounded-lg">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
