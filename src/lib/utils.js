import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
//const MONGO_URI = "mongodb://127.0.0.1:27017/zeraNext"

console.log('MongoDB URI:', MONGO_URI); // Log the URI for debugging

export const connectoDb = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error(error);
    }
};
