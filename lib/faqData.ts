import type { LucideIcon } from "lucide-react";
import { Clock, Users, CreditCard, MapPin, Shield, Home } from "lucide-react";


interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: LucideIcon; // 👈 This is the correct type
  link?: {
    text: string;
    url: string;
  };
}


export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What are your facility's hours of operation?",
    answer:
      "Our facility welcomes you every day from 9:00 AM to 11:00 PM, providing ample time for practice, play, and training sessions.",
    category: "General",
    icon: Clock,
  },
  {
    id: "2",
    question: "Do you offer drop in access or is membership required?",
    answer:
      "We offer flexible drop‑in access for non‑members at a daily rate. Simply stop by the front desk to purchase a pass and enjoy full facility privileges without a membership commitment.",
    category: "Membership",
    icon: Users,
  },
  {
    id: "3",
    question: "How do I purchase a membership?",
    answer:
      "You can sign up online or visit us in person - our friendly staff will guide you through the process at the front desk.",
    category: "Membership",
    icon: CreditCard,
    link: {
      text: "View Memberships",
      url: "/allmemberships",
    },
  },
  {
    id: "4",
    question: "Where are you located and is there on site parking?",
    answer:
      "Find us at 401 33 Street NE. We offer complimentary on site parking to make your visit as convenient as possible.",
    category: "Location",
    icon: MapPin,
  },
  {
    id: "5",
    question: "Do you offer a free trial or guest pass?",
    answer:
      "We encourage prospective members to tour our facility and enjoy a complimentary trial pass. Contact us to schedule your guest visit and experience everything we offer.",
    category: "Membership",
    icon: Users,
  },
  {
    id: "6",
    question: "When is my membership automatically renewed, and how will I be billed?",
    answer:
      "Memberships renew automatically according to your chosen plan monthly, quarterly, or annually. Billing is processed securely using your saved payment method, and you can update your renewal preferences anytime in your account settings.",
    category: "Billing",
    icon: CreditCard,
  },
  {
    id: "7",
    question: "Are there changing rooms on site?",
    answer:
      "Yes, we provide spacious on site changing rooms equipped to ensure your comfort before and after your workout.",
    category: "Facilities",
    icon: Home,
  },
  {
    id: "8",
    question: "Do you have on site first aid or AEDs?",
    answer:
      "Safety is our priority. Our facility is equipped with first aid kits and Automated External Defibrillators (AEDs), and our staff are trained to assist in case of any medical emergency.",
    category: "Safety",
    icon: Shield,
  },
  {
    id: "9",
    question: "How much are RISE programs?",
    answer:
      "Program pricing varies by type:\n• Jr. Rise Full Year – $135/month + GST\n• Jr. Rise Seasonal (3 months) – $425 + GST (billed in 3 equal payments)\n• Seasonal Membership (3 months, Rise League only) – $680 + GST (billed in 3 equal payments)\n• Full Year Membership – $225/month (billed bi-weekly)\n• Spring/Summer Club Membership – $1680 + GST\n• Open Gym Access – $47/month (drop-in access to court + weight room)",
    category: "Membership",
    icon: CreditCard,
  },
  {
  id: "10",
  question: "What is your cancellation and refund policy?",
  answer: `We understand that life happens — but to keep our programs running smoothly, we unfortunately don’t offer cancellations or refunds once a program has started.

    However, we may consider exceptions for:
    • Medical emergencies (with a doctor’s note)
    • Relocation out of the city (with proof)

    If you believe your situation qualifies, please <a href="tel:5878997473" style="color: #ffb800; text-decoration: underline;">reach out to us directly</a>. We're here to help and will do our best to find a fair solution.

    Note: When approved, credits may be applied to your RISE account instead of refunds.`,

  category: "Membership",
  icon: Shield,
},

  {
    id: "11",
    question: "How long is each program?",
    answer:
      "Full Year: 12-month commitment (includes all four Rise Leagues: Summer, Fall, Winter, Spring).\nSeasonal: 3-month commitment (includes Jr. Rise and Rise League).",
    category: "General",
    icon: Clock,
  },
  {
    id: "12",
    question: "What's the difference between Club and Rise League?",
    answer:
      "Club basketball focuses on high-level competition, travel, and performance-driven tournaments.\nRise League (in-house) emphasizes skill development in a supportive environment.\nNote: Club tournament and travel fees are not included in memberships.",
    category: "General",
    icon: Users,
  },
  {
    id: "13",
    question: "Do you accept financial assistance (KidSport, Jumpstart)?",
    answer:
      "Yes. If you plan to apply for funding, please notify us before registering. Once approved, funds will be applied as credits to the player’s account (no monetary refunds).",
    category: "Billing",
    icon: CreditCard,
  },
];
