import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{
    portfolioId: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { portfolioId } = await params;
    
    if (!portfolioId) {
      return NextResponse.json(
        { success: false, error: "Portfolio ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Check if collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    if (!collectionNames.includes("projectdescriptions")) {
      return NextResponse.json(
        { success: false, error: "Project description not found", data: null },
        { status: 404 }
      );
    }

    const collection = db.collection("projectdescriptions");
    const projectDescription = await collection.findOne({
      portfolioItemId: portfolioId
    });

    if (!projectDescription) {
      return NextResponse.json(
        { success: false, error: "Project description not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: projectDescription,
        message: "Project description retrieved successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching project description:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error"
      },
      { status: 500 }
    );
  }
}

