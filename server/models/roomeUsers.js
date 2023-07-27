import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    rerquired: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    required: false,
  },
});

const RoomEUser = mongoose.model("RoomEUser", userSchema);

export default RoomEUser;
