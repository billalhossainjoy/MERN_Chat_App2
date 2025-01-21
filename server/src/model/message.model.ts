import mongoose, { Types, Schema, model } from "mongoose";

interface Message extends Document {
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  reciverId: Types.ObjectId;
  text: string;
  image: string;
}

const messageSchema: Schema = new Schema<Message>({
  senderId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  reciverId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String },
  image: { type: String },
});

const MessageModel = model<Message>("Message", messageSchema);

export default MessageModel;
