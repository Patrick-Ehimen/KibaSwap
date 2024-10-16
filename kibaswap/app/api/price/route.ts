import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// Function to handle GET requests for price data
export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const sellToken = searchParams.get("sellToken");
  const buyToken = searchParams.get("buyToken");
  const sellAmount = searchParams.get("sellAmount");
  const chainId = searchParams.get("chainId");

  // Check if all required parameters are present
  if (!sellToken || !buyToken || !sellAmount || !chainId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 } // Return a 400 status code for bad request
    );
  }

  // Construct API parameters for the price API request
  const apiParams = new URLSearchParams({
    sellToken,
    buyToken,
    sellAmount,
    chainId,
  });

  try {
    // Fetch price data from the 0x API
    const res = await fetch(`https://api.0x.org/swap/v1/price?${apiParams}`, {
      headers: {
        "0x-api-key": process.env.NEXT_PUBLIC_OX_API_KEY as string, // Use the API key from environment variables
        "0x-version": "v2", // Specify the API version
      },
    });
    const data = await res.json();

    // Log the API request and the received data for debugging purposes
    console.log(
      "Price API request:",
      `https://api.0x.org/swap/v1/price?${apiParams}`
    );
    console.log("Price data:", data);

    // Return the fetched price data
    return NextResponse.json(data);
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error("Error fetching price data:", error);
    // Return an error response with a 500 status code for internal server error
    return NextResponse.json(
      { error: "Failed to fetch price data" },
      { status: 500 }
    );
  }
}
