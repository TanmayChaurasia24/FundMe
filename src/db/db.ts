import { error, log } from "console";
import mongoose, { connection } from "mongoose";

export const dbconnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connect = mongoose.connection;

        connection.on('connected',() => {
            console.log('MongoDB connected');
            
        })

        connection.on('error',(error) => {
            console.log('mongoDB connection error'+error);
            process.exit();
        })
    } catch (error) {
        console.log(error);
        
    }
}   


