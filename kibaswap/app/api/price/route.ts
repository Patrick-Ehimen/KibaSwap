import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const res = await fetch(
      `https://api.0x.org/swap/permit2/price?${searchParams}`,
      {
        headers: {
          "0x-api-key": process.env.NEXT_PUBLIC_OX_API_KEY as string,
          // "0x-chain-id": searchParams.get("chainId") as string,
        },
      }
    );
    const data = await res.json();

    console.log(
      "price api",
      `https://api.0x.org/swap/permit2/price?${searchParams}`
    );

    console.log("price data", data);

    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
