import { NextResponse } from "next/server";
import data from "@/data/mock_data.json";

// const pathDataJson = "@/data/mock_data.json";
// const data = await fetch(pathDataJson).then((res) => res.json());

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.error();
  }
}
