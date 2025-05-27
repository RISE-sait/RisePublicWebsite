import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!;
  const DATACENTER = API_KEY.split("-")[1];

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const response = await fetch(
    `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status >= 400) {
    const error = await response.json();
    return NextResponse.json(
      { error: error.detail || "Subscription failed" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Subscribed successfully" },
    { status: 201 }
  );
}
