import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    if (error.reason?.servers) {
      error.reason.servers.forEach((server, address) => {
        console.error(`\nServer: ${address}`);
        console.error("Type:", server.type);
        console.error(
          "Error:",
          server.error?.message || "No detailed error"
        );
      });
    }

    process.exit(1);
  }
};

export default connectDB;