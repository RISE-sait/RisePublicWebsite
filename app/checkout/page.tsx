"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/configs/firebase";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan");
  const [error, setError] = useState<string>("");
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    if (!plan) {
      setError("No plan selected.");
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not signed in → send them to login, keep plan in the URL
        router.replace(`/login?plan=${plan}`);
        return;
      }

      try {
        // Authed! Get fresh token and call your endpoint that creates the Stripe session.
        const idToken = await user.getIdToken(true);
        const res = await fetch(`/api/checkout/membership_plans/${plan}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        // If your API does a 303 redirect to Stripe, follow it:
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        // Or, if it returns { url }, handle it:
        const { url } = await res.json();
        window.location.href = url;
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Checkout failed");
      }
    });

    return () => unsub();
  }, [auth, plan, router]);

  if (error) return <p className="text-red-500">{error}</p>;
  return <p className="text-center mt-20">Redirecting you to Stripe…</p>;
}
