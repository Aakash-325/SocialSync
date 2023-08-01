import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
      username: {
        type: String,
        require: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      friends: {
        type: Array,
        default: [],
      },
      profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
    },
    { timestamps: true }
  );

  
export default mongoose.model("User", UserSchema);