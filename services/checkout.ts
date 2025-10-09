// services/checkout.ts
import { PaymentCheckoutResponseDto } from "@/app/api/Api";

// Read directly from the environment variable
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getMembershipPlanCheckoutUrl(
  planId: string
): Promise<string> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    const res = await fetch(`${apiBaseUrl}/checkout/membership_plans/${planId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Failed to get checkout URL:`, res.status, errorText);

      // Parse error message for more specific error handling
      let errorMessage = "Could not get checkout URL";
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (parseError) {
        // If we can't parse the error, use the raw text
        errorMessage = errorText;
      }

      throw new Error(`Failed to get checkout URL: ${res.status} ${errorMessage}`);
    }

    const data: PaymentCheckoutResponseDto = await res.json();

    if (!data.payment_url) {
      throw new Error("No payment URL returned");
    }

    return data.payment_url;
  } catch (err) {
    console.error("🔥 Error getting checkout URL:", err);
    throw err;
  }
}

export async function getCreditPackageCheckoutUrl(
  creditPackageId: string
): Promise<string> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    const res = await fetch(`${apiBaseUrl}/checkout/credit_packages/${creditPackageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Failed to get credit package checkout URL:`, res.status, errorText);

      // Parse error message for more specific error handling
      let errorMessage = "Could not get checkout URL";
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (parseError) {
        // If we can't parse the error, use the raw text
        errorMessage = errorText;
      }

      throw new Error(`Failed to get checkout URL: ${res.status} ${errorMessage}`);
    }

    const data: PaymentCheckoutResponseDto = await res.json();

    if (!data.payment_url) {
      throw new Error("No payment URL returned");
    }

    return data.payment_url;
  } catch (err) {
    console.error("🔥 Error getting credit package checkout URL:", err);
    throw err;
  }
}