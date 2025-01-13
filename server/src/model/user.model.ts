import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
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
  profilePic: {
    type: String,
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
