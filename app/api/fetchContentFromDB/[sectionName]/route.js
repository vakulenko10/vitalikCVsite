import { NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');
    console.log("sectionName: ", params.sectionName)
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("collections:", collections);

    const collectionNames = collections.map(collection => collection.name);

    if (!collectionNames.includes(params.sectionName)) {
      return NextResponse.error({ message: 'Invalid sectionName' }, { status: 400 });
    }

    const collection = db.collection(params.sectionName);
    const documents = await collection.find({}).toArray();

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}