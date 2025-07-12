"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import JumpstartModal from "./JumpstartModal";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";


interface FAQItem {
  id: string;
  question: string;
  answer: string | JSX.Element; // 🔧 Allow string or JSX
  category: string;
  icon: LucideIcon;
  link?: {
    text: string;
    url: string;
  };
}


interface Props {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQAccordion({ item, isOpen, onToggle }: Props) {
  const Icon = item.icon;
  const [modalOpen, setModalOpen] = useState(false);
  const isJumpstart = item.question.toLowerCase().includes("jumpstart");


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#111] to-black border border-[#ffb800]/20 rounded-xl shadow-lg hover:shadow-[#ffb800]/10 transition-all"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-[#ffb800]/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <Icon className="h-5 w-5 text-[#ffb800]" />
          <h3 className="text-lg font-semibold text-white pr-4" id={`faq-question-${item.id}`}>
            {item.question}
          </h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-[#ffb800]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-question-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
        <div className="px-6 pb-6 pl-9 text-gray-300 whitespace-pre-line">
            {isJumpstart ? (
                <>
                {typeof item.answer === "string" ? (
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                ) : (
                    item.answer
                )}
                <button
                    onClick={() => setModalOpen(true)}
                    className="mt-3 inline-block text-[#ffb800] underline hover:text-[#e0a300] transition-colors"
                >
                    Learn more about financial assistance
                </button>
                <JumpstartModal open={modalOpen} onClose={() => setModalOpen(false)} />
                </>
            ) : item.link ? (
                <>
                {typeof item.answer === "string" ? (
                    <>
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    <Link
                        href={item.link.url}
                        className="text-[#ffb800] underline hover:text-[#e0a300]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.link.text}
                    </Link>
                    </>
                ) : (
                    item.answer
                )}
                </>
            ) : typeof item.answer === "string" ? (
                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
            ) : (
                item.answer
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
