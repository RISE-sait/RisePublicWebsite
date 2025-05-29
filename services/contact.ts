const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  token: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const url = `${apiBaseUrl}/contact`; 

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorText = "";
      try {
        errorText = await res.text();
      } catch {
        errorText = "Could not read backend error.";
      }
      throw new Error(`Contact form failed: ${res.status} - ${errorText}`);
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    if (err instanceof Error) throw err;
    throw new Error("An unknown error occurred.");
  }
}
