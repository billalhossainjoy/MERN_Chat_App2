import mongoose, { Schema, Types } from "mongoose";

export interface User extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: Date;
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
}, {
  timestamps: true,
});

export const UserModel = mongoose.model<User>("User", userSchema);
