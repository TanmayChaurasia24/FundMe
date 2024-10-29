"use server";

import Razorpay from "razorpay";
import PaymentModel from "@/models/paymentModel";
import { dbconnect } from "@/db/db";
import userModel from "@/models/userModel";

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
