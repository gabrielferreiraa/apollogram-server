import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  picture?: string | null;
}

const userModel: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userModel.pre<User>("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default mongoose.model<User>("User", userModel);
