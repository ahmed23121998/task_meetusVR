import { getToken } from "@/app/lib/token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getToken();

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const upstreamResponse = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!upstreamResponse.ok) {
      if (upstreamResponse.status === 401) {
        // Token expired or invalid, redirect to login
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("User info error:", error);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
