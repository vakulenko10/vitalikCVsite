import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{
    sectionName: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { sectionName } = await params;
    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');
    console.log("sectionName: ", sectionName);
    
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const collections = await db.listCollections().toArray();
    console.log("collections:", collections);

    const collectionNames = collections.map(collection => collection.name);

    if (!collectionNames.includes(sectionName)) {
      return NextResponse.json({ error: 'Invalid sectionName' }, { status: 400 });
    }

    const collection = db.collection(sectionName);
    const documents = await collection.find({}).toArray();

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

