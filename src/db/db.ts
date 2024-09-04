import mongoose from "mongoose";

export const dbconnect = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL environment variable not set");
        }

        // Establish connection
        await mongoose.connect(process.env.MONGO_URL);

        // Log successful connection
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        // Handle connection errors
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error: " + err);
            process.exit(1);
        });

    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
};
