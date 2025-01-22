interface IUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt: Date;
}

interface IMessage {
  _id: string;
  senderId: string;
  reciverId: string;
  text?: string;
  image?: string;
  createdAt: Date;
}
