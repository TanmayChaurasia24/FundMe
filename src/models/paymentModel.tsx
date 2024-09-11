import mongoose from "mongoose";

const { Schema, model } = mongoose;

interface Payment {
    name: string;
    to_user: string;
    oid: string;
    message?: string;
    amount: number;
    done:boolean;
}

const PaymentSchema = new Schema<Payment>({
    name: {
        type: String,
        required: true
    },
    to_user: {
        type: String,
        required: true
    },
    oid: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    done: {
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const PaymentModel = mongoose.models.payments || model<Payment>("payments", PaymentSchema);

export default PaymentModel;
