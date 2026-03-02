import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const schemaPath = path.join(
      process.cwd(),
      ".autoui-runtime-schema.json",
    );

    const contents = await readFile(schemaPath, "utf-8");

    return new NextResponse(contents, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return new NextResponse("AutoUI runtime schema not found", {
      status: 404,
    });
  }
}

