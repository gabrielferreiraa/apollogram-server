import userModel, { User } from "./models/userModel";
import postModel from "./models/postModel";

const context = {
  models: {
    user: userModel,
    post: postModel,
  },
};

export type Context = typeof context & { me?: User | null };

export default context;
