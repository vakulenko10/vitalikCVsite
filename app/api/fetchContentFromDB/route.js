// import { NextResponse } from "next/server";
//   import connectMongoDB from '@/libs/mongo_db';
// //   import { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem } from '@/models/models';
//   import mongoose from "mongoose";
//   export const sectionToModelMap = {
//         'welcome': HelloItem,
//         'aboutMe': AboutMeItem,
//         'myPortfolio': MyPortfolioItem,
//         'myBlog': MyBlogItem,
//         'FAQS': FAQSItem
//       };
//   // export const sectionList = Object.keys(sectionToModelMap);
// //   export function getModelProperties(collectionName) {
// //         const model = sectionToModelMap[collectionName];
// //         return model ? Object.keys(model.schema.paths) : null;
// //       }
//   export async function GET(req, { params }) {
//     try {
      
//     //   console.log("params.collectionName: ", params.collectionName)
//       console.log('Starting GET method');
//       await connectMongoDB();
//       console.log('Connected to MongoDB');
//       const db = mongoose.connection.db;
//     const collections = await db.listCollections().toArray();
//     console.log("collections:",collections)
//     //   console.log("Keys in sectionToModelMap:", Object.keys(sectionToModelMap));
//     //   console.log("params:", params)
//     //   const model = sectionToModelMap[params.collectionName];
//     //   console.log("sectionToModelMap[params.collectionName]", sectionToModelMap[params.collectionName])
//     //   console.log("model:", model)
      
//       if (!model) {
//         return NextResponse.error({ message: 'Invalid collectionName' }, { status: 400 });
//       }
//     //   const modelProperties = getModelProperties(params.collectionName);
//       const contentItems = await model.find();
//       console.log('Content items:', contentItems);

//       return NextResponse.json({ contentItems, modelProperties }, { status: 200 });
//     } catch (error) {
//       console.error('Error in GET method:', error);
//       return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
//     }
//   }
import { NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("collections",collections)
    const data = {};

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();
      data[collectionName] = documents;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}
// import { NextResponse } from "next/server";
// import connectMongoDB from '@/libs/mongo_db';
// import mongoose from "mongoose";

// export async function GET(req, { params }) {
//   // const { collectionName } = params;
//   try {
//     console.log('Starting GET method');
//     await connectMongoDB();
//     console.log('Connected to MongoDB');

//     const db = mongoose.connection.db;
//     const collections = await db.listCollections().toArray();
//     console.log("collections", collections);
//     const data = {};

//     for (const collectionInfo of collections) {
//       const collectionName = collectionInfo.name;
//       const collection = db.collection(collectionName);
//       const documents = await collection.find({}).toArray();

//       // Fetch schema using Mongoose's Model
//       const model = mongoose.models[collectionName];
//       const schema = model ? model.schema.paths : null;
//       const filteredSchema = {};

//       // Check for substrings in property names
//       Object.keys(schema).forEach(propertyName => {
//         if (propertyName.includes('ua')) {
//           // Add properties with 'ua' substring to filteredSchema
//           filteredSchema[propertyName] = schema[propertyName];
//         }
//         // You can add more conditions to filter based on other substrings
//       });
//       data[collectionName] = { documents, schema };
//     }
//     console.log("data:",data)
//     return NextResponse.json({ data }, { status: 200 });
//   } catch (error) {
//     console.error('Error in GET method:', error);
//     return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }