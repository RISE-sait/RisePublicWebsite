import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const allowedTags = ["main-newsletter", "coffee-updates", "supplement-announcments"];
  const { email, tag } = await req.json();
  const tagToUse = allowedTags.includes(tag) ? tag : "main-newsletter";


  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN!;
  const API_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

  const contactPayload = {
    properties: {
      email,
      newsletter_tag: tagToUse,
    },
  };

  // Try creating the contact
  const createRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactPayload),
  });

  const data = await createRes.json();

  // If the contact already exists
  if (createRes.status === 409 && data.category === "CONFLICT") {
    // Find contact ID
    const searchRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [{ propertyName: "email", operator: "EQ", value: email }],
            },
          ],
          properties: ["email"],
        }),
      }
    );

    const searchData = await searchRes.json();
    const id = searchData.results?.[0]?.id;

    if (id) {
      // Update the contact's tag
      const updateRes = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            newsletter_tag: tag,
          },
        }),
      });

      if (!updateRes.ok) {
        const error = await updateRes.json();
        return NextResponse.json(
          { error: error.message || "Failed to update contact" },
          { status: updateRes.status }
        );
      }

      return NextResponse.json(
        { message: "You're already subscribed. Tag updated." },
        { status: 200 }
      );
    }
  }

  if (!createRes.ok) {
    return NextResponse.json(
      { error: data.message || "Subscription failed" },
      { status: createRes.status }
    );
  }

  return NextResponse.json({ message: "Subscribed successfully!" }, { status: 201 });
  
}
