import mongoose, { Schema } from "mongoose";

interface User extends Document {
  fullName: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
