import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
    try {
        if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
            throw new Error('NEXT_PUBLIC_MONGODB_URI is not defined');
        }
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
        if (process.env.NODE_ENV !== 'production') {
          console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default connectMongoDB;




