import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const collections = await db.listCollections().toArray();
    console.log("collections", collections);
    const data: Record<string, unknown[]> = {};

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();
      data[collectionName] = documents;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




