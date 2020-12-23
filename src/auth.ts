import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

import userModel, { User } from "models/userModel";
import { jwtSecret } from "config";

export const getUser = async (token: string) => {
  try {
    const decodedToken: any = jwt.verify(token, jwtSecret);
    return await userModel.findOne({ _id: decodedToken.id });
  } catch (e) {
    throw new AuthenticationError("Your session expired. Sign in again.");
  }
};

export const generateToken = (user: User) =>
  jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "12h",
  });
