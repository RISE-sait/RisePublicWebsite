import { NextResponse } from "next/server"
import md5 from "blueimp-md5"

export async function POST(req: Request) {
  const { email, tag } = await req.json()

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY!
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!
  const DATACENTER = API_KEY.split("-")[1]
  const subscriberHash = md5(email.toLowerCase())
  const BASE_URL = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`

  const tagToApply = tag || "general-newsletter"

  // Try to create subscriber first
  const createResponse = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      tags: [tagToApply],
    }),
  })

  const createData = await createResponse.json()

  // Handle if already exists
  if (createResponse.status === 400 && createData.title === "Member Exists") {
    // Fetch current member status
    const memberResponse = await fetch(`${BASE_URL}/${subscriberHash}`, {
      method: "GET",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const memberData = await memberResponse.json()

    // If not already subscribed, re-subscribe them
    if (memberData.status !== "subscribed") {
      const resubscribe = await fetch(`${BASE_URL}/${subscriberHash}`, {
        method: "PUT",
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          status: "subscribed",
        }),
      })

      if (!resubscribe.ok) {
        const e = await resubscribe.json()
        return NextResponse.json({ error: e.detail || "Resubscribe failed" }, { status: 400 })
      }
    }

    // Now apply the tag
    const tagResponse = await fetch(`${BASE_URL}/${subscriberHash}/tags`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: [{ name: tagToApply, status: "active" }],
      }),
    })

    if (!tagResponse.ok) {
      const e = await tagResponse.json()
      return NextResponse.json({ error: e.detail || "Tagging failed" }, { status: 400 })
    }

    return NextResponse.json(
      { message: "You're already subscribed. We've updated your interest tag!" },
      { status: 200 }
    )
  }

  // Handle any unexpected error
  if (!createResponse.ok) {
    return NextResponse.json(
      { error: createData.detail || "Unexpected subscription error" },
      { status: createResponse.status }
    )
  }

  // All good
  return NextResponse.json(
    { message: "Subscribed successfully!" },
    { status: 201 }
  )
}
