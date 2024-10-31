import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import PaymentModel from "@/models/paymentModel";
import Razorpay from "razorpay";
import { dbconnect } from "@/db/db";

export const POST = async (req: any) => {
  try {
    await dbconnect();

    let body = await req.formData();
    body = Object.fromEntries(body);

    // Ensure we received the correct parameters
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    // Check if order exists in the database
    let order = await PaymentModel.findOne({ oid: razorpay_order_id });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const isVerified = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      process.env?.KEY_SECRET!
    );

    if (!isVerified) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 403 }
      );
    }

    const updatepayment = await PaymentModel.findByIdAndUpdate({
        oid: body.razorpay_order_id
    },{
        done: "true"
    },{
        new: true
    })
    return NextResponse.redirect(`${process.env.URL}/${updatepayment.to_user}?paymentdone=true`)
  } catch (error) {
    console.error("Error processing payment verification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
