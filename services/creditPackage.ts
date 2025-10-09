// services/creditPackage.ts

export interface CreditPackageResponse {
  id: string;
  name: string;
  description: string;
  credit_allocation: number;
  weekly_credit_limit: number;
  stripe_price_id: string;
  created_at: string;
  updated_at: string;
  price?: number; // Price from API as a number
  currency?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  description: string;
  credit_allocation: number;
  weekly_credit_limit: number;
  stripe_price_id: string;
  created_at: string;
  updated_at: string;
  price: number; // Parsed price
}

export async function getAllCreditPackages(): Promise<CreditPackage[]> {
  try {
    // Read the environment variable at runtime
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      console.error("❌ NEXT_PUBLIC_API_BASE_URL is not defined");
      throw new Error("API base URL is not configured");
    }

    const response = await fetch(`${apiBaseUrl}/credit_packages`);

    if (!response.ok) {
      throw new Error(`Failed to fetch credit packages: ${response.statusText}`);
    }

    const data: CreditPackageResponse[] = await response.json();

    // Map the API response to our CreditPackage format
    return data.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      credit_allocation: pkg.credit_allocation,
      weekly_credit_limit: pkg.weekly_credit_limit,
      stripe_price_id: pkg.stripe_price_id,
      created_at: pkg.created_at,
      updated_at: pkg.updated_at,
      // Price is already a number from the API
      price: pkg.price || 0,
    }));
  } catch (error) {
    console.error("Error fetching credit packages:", error);
    throw error;
  }
}

export async function getCreditPackageById(id: string): Promise<CreditPackage> {
  try {
    // Read the environment variable at runtime
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      console.error("❌ NEXT_PUBLIC_API_BASE_URL is not defined");
      throw new Error("API base URL is not configured");
    }

    const response = await fetch(`${apiBaseUrl}/credit_packages/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch credit package: ${response.statusText}`);
    }

    const packageData = await response.json();
    return packageData;
  } catch (error) {
    console.error("Error fetching credit package:", error);
    throw error;
  }
}
