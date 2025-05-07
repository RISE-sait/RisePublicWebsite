"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { FOOTER_LINKS, PAYMENT_METHODS, SITE_NAME } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const socialIcons = {
    Instagram,
    Twitter,
    Youtube,
    Facebook,
  };

  return (
    <footer className="bg-black text-white border-t border-[#222] pt-16 pb-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb800]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffb800]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-block text-center justify-center">
              <span className="text-3xl font-bold text-white ">
                SUBSCRIBE TO OUR NEWSLETTER!
              </span>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex max-w-md w-full mb-6"
          >
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow px-4 py-3 h-10 bg-[#111] border border-[#333] rounded-l-md focus:outline-0 focus:border-[#ffb800] transition-all"
            />
            <Button
              variant="default"
              className="px-4 py-3 h-10 bg-[#ffb800] text-black hover:bg-[#e0a300] rounded-l-none hover:scale-105 transition-all shadow-lg "
            >
              Submit
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-gray-400 text-center mb-8"
          >
            By submitting your email, you agree to the Terms & Conditions and
            Privacy Policy. You may unsubscribe at any time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm mb-4"
          >
            Accepted Payment Methods
          </motion.div>
          <div className="flex gap-3 mb-12">
            {PAYMENT_METHODS.map(({ name, src }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="rounded p-1 w-14 h-10 flex items-center justify-center  transition-all"
              >
                <Image
                  src={src}
                  alt={name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4 text-lg relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ffb800]"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {FOOTER_LINKS.contact.map((link, index) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-[#ffb800] transition-colors"
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ffb800]"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {FOOTER_LINKS.company.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-[#ffb800] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg relative inline-block">
              Policies
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ffb800]"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {FOOTER_LINKS.policies.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-[#ffb800] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg relative inline-block">
              Socials
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ffb800]"></span>
            </h3>
            <div className="flex gap-4">
              {FOOTER_LINKS.socials.map((social, index) => {
                const IconComponent =
                  socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#111] p-3 rounded-full hover:bg-[#ffb800] hover:text-black transition-all shadow-lg"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
          © {new Date().getFullYear()} {SITE_NAME} Sports Complex Inc. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
