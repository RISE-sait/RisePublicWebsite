"use client";

import { useState, useEffect } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function CookiePreferencesModal() {
  const { consent, isPreferencesOpen, closePreferences, updateConsent } =
    useCookieConsent();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Sync local state with consent when modal opens
  useEffect(() => {
    if (isPreferencesOpen) {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
    }
  }, [isPreferencesOpen, consent]);

  const handleSave = () => {
    updateConsent({ analytics, marketing });
  };

  return (
    <Dialog open={isPreferencesOpen} onOpenChange={closePreferences}>
      <DialogContent className="bg-[#111] border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Cookie Preferences</DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your cookie settings. Essential cookies cannot be disabled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Essential Cookies - Always On */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Essential Cookies</h4>
              <p className="text-sm text-gray-400">
                Required for the website to function (theme, session)
              </p>
            </div>
            <Switch checked disabled className="opacity-50" />
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Analytics Cookies</h4>
              <p className="text-sm text-gray-400">
                Help us understand how visitors use our site
              </p>
            </div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </div>

          {/* Marketing Cookies */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Marketing Cookies</h4>
              <p className="text-sm text-gray-400">
                Used for personalized advertisements
              </p>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={closePreferences}
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#ffb800] text-black hover:bg-[#e0a300]"
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
