// app/components/MembershipList.tsx
"use client";

import { useState, useEffect } from "react";
import { getAllMemberships } from "@/services/membership";
import { Membership } from "@/types/membership";

export default function MembershipList() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllMemberships()
      .then((data) => setMemberships(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading memberships…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="memberships-container">
      {memberships.map((m) => (
        <div key={m.id} className="membership-card">
          <h2>{m.name}</h2>
          {m.description && <p>{m.description}</p>}
        </div>
      ))}
    </div>
  );
}
