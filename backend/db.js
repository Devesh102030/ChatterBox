import mongoose, { connect } from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected")
    }
    catch(err){
        console.error('MongoDB connection failed', err);
    }
}

export default connectDB;