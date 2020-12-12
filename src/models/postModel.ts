import mongoose, { Schema, Document } from "mongoose";
import { User } from "./userModel";

const { ObjectId } = mongoose.Schema.Types;

export interface Post extends Document {
  title: string;
  content: string;
  user: User;
}

const postModal: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<Post>("Post", postModal);
