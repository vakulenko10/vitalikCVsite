import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
    try {
        if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
            throw new Error('NEXT_PUBLIC_MONGODB_URI is not defined');
        }
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
        console.log("###################################################connected to mongodb");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default connectMongoDB;



