import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  profilepic: { type: String, default: "https://i.imgur.com/6VBx3io.png" },
  bio: { type: String, default: "" },
  country: { type: String, default: "" },
  showBio: { type: Boolean, default: true},

});

const UserModel = mongoose.model("users", UserSchema, "users");

export default UserModel;