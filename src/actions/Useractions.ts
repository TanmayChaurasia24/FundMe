"use server";

import Razorpay from "razorpay";
import PaymentModel from "../models/paymentModel";
import { dbconnect } from "../db/db";
import userModel from "../models/userModel";

export const initiate = async (
    amount: number,
    to_username: string | undefined | null,
    paymentform: any
) => {
    await dbconnect();
    var instance = new Razorpay({
        key_id: process.env.KEY_ID!,
        key_secret: process.env.KEY_SECRET!,
    });
    console.log(amount);
    
    let options = {
        amount: Number.parseInt(String(amount)),
        currency: "INR",
    }

    let x = await instance.orders.create(options);
    
    await PaymentModel.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
    });

    return x;
};

export const fetchuser = async (username: string) => {
    try {
        await dbconnect();
        const user = await userModel.findOne({ username: username });

        if (!user) {
            console.log(`User with username ${username} not found.`);
            return null; 
        }

        const currUser = user.toObject({flattenObjectIds: true});
        return currUser;

    } catch (error) {
        console.error("Error fetching user:", error);
        return;
    }
};

export const fetchpayments = async(username: string | null | undefined): Promise<any[]> => {
    try {
        if(username === null || username === undefined) {
            username = "";
        }
        await dbconnect();
        const payment = await PaymentModel.find({to_user: username, done: true}).sort({createdAt: -1}).lean()

        if(!payment) {
            console.log(`No payments found for user ${username}.`)
            return [];
        }
        // console.log( payment );        
        return payment
    } catch (error) {
        console.error("error in fetching the payments of the user: ", error);
        return [];
    }
}
