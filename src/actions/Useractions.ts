"use server";

import Razorpay from "razorpay";
import PaymentModel from "@/models/paymentModel";
import { dbconnect } from "@/db/db";
import userModel from "@/models/userModel";

export const initiate = async (
    amount: string,
    to_username: string,
    paymentform: any
) => {
    await dbconnect();
    var instance = new Razorpay({
        key_id: process.env.KEY_ID!,
        key_secret: process.env.KEY_SECRET!,
    });

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options);

    await PaymentModel.create({
        order_id: x.id,
        amount: amount,
        to_username: to_username,
        name: paymentform.name,
        message: paymentform.message,
    });

    return x;
};
