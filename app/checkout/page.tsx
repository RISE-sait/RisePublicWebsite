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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!plan) {
      setError("No plan selected.");
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace(`/login?plan=${plan}`);
        return;
      }

      try {
        const idToken = await user.getIdToken(true);
        console.log("🔥 Firebase ID Token:", idToken);

        // STEP 1: Exchange Firebase ID token for backend JWT
        const authRes = await fetch(`${apiBaseUrl}/auth`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!authRes.ok) {
          throw new Error("Failed to authenticate with backend");
        }

        const jwtHeader = authRes.headers.get("authorization");
        const backendJwt = jwtHeader?.replace("Bearer ", "");

        if (!backendJwt) {
          throw new Error("JWT missing from response headers");
        }

        console.log("🔐 Backend JWT:", backendJwt);
        localStorage.setItem("jwt", backendJwt);

        // STEP 2: Start Stripe checkout session
        const checkoutRes = await fetch(
          `${apiBaseUrl}/checkout/membership_plans/${plan}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${backendJwt}`,
            },
          }
        );

        const responseBody = await checkoutRes.json();

        if (checkoutRes.ok && responseBody.payment_url) {
          window.location.href = responseBody.payment_url;
        } else {
          console.error("❌ Checkout failed:", checkoutRes.status, responseBody);
          throw new Error("Failed to start checkout");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Checkout failed");
      }
    });

    return () => unsub();
  }, [auth, plan, router, apiBaseUrl]);

  if (error) return <p className="text-red-500">{error}</p>;
  return <p className="text-center mt-20">Redirecting you to Stripe…</p>;
}
