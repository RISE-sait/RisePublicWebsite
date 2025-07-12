"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JumpstartModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border-[#ffb800]/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-[#ffb800] text-xl">
            Financial Assistance: KidSport & Jumpstart
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-300">
          <p>
            RISE proudly supports community access to sport through partnerships with <strong>KidSport</strong> and <strong>Jumpstart</strong>.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Apply directly through KidSport or Jumpstart websites.</li>
            <li>Let us know you’re applying <em>before</em> registration.</li>
            <li>Once approved, funds are applied as credits to your account (no refunds).</li>
          </ul>
          <p>
            Need help? Give us a call at{" "}
            <Link href="tel:587-899-7473" className="text-[#ffb800] underline">
              587‑899‑7473
            </Link>{" "}
            and we’ll walk you through the process.
          </p>
          <p>
            Or learn more at:
            <br />
            <Link
              href="https://www.kidsportcanada.ca"
              target="_blank"
              className="text-[#ffb800] underline"
            >
              KidSport Canada
            </Link>{" "}
            |{" "}
            <Link
              href="https://jumpstart.canadiantire.ca/"
              target="_blank"
              className="text-[#ffb800] underline"
            >
              Jumpstart Program
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
