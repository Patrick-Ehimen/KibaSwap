import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const res = await fetch(
    `https://api.0x.org/swap/permit2/quote?${searchParams}`,
    {
      headers: {
        "0x-api-key": process.env.NEXT_PUBLIC_OX_API_KEY as string,
      },
    }
  );
  const data = await res.json();

  console.log(
    "quote api",
    `https://api.0x.org/swap/permit2/quote?${searchParams}`
  );

  return Response.json(data);
}
