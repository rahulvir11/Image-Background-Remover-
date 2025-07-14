import mongoose from "mongoose";
 
const connectDB = async () => {
  try {

    mongoose.connection.on("connected", () => {
        console.log("✅ MongoDB connected successfully.");
    });
    
    // Connect to the MongoDB database
    await mongoose.connect(`${process.env.MONGODB_URL}/bgremoval`);
    
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
};
export default connectDB;