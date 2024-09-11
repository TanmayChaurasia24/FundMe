import mongoose from "mongoose";
import { Url } from "next/dist/shared/lib/router/router";

interface UserDefine {
    username: string; 
    email:string;
    password:string;
    isVerified:boolean;
    isAdmin:boolean;
    profilepic?:Url;
    coverpic?:Url;
    forgotPasswordToken?: Date;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: String;
    verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<UserDefine>({
    username: {
        type: String,
        required: [true,"unique username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"unique email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilepic: {
        type:String,
        default: "",
    },
    coverpic: {
        type:String,
        default: "",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});


const User = mongoose.models.users || mongoose.model("users",userSchema);
export default User;

