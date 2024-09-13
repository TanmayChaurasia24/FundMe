import mongoose from "mongoose";

// Interface for the User document
interface UserDefine {
  username: string;
  email: string;
  password?: string; // Make password optional for OAuth users
  profilepic?: string;
  coverpic?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

// Mongoose schema for the User model
const userSchema = new mongoose.Schema<UserDefine>({
  username: {
    type: String,
    required: [true, "A unique username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A unique email is required"],
    unique: true,
  },
  password: {
    type: String, // Make password optional for OAuth users
    required: false,
  },
  profilepic: {
    type: String,
    default: "",
  },
  coverpic: {
    type: String,
    default: "",
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Ensure the model is not redefined
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
