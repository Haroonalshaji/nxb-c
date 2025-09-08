import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const res = await fetch("https://vh-api.in/api/v1/auth/customer-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
