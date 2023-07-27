import RoomEUser from "../models/roomeUsers.js";
import jwt from "jsonwebtoken";
export const changePicture = async (req, res) => {
  try {
    const { picturePath } = req.body;
    const { token } = req.cookies;
    const cookieData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await RoomEUser.findById(cookieData.userId);
    user.picturePath = picturePath;
    const savedUser = await user.save();
    res
      .status(200)
      .json({
        username: savedUser.username,
        userId: savedUser._id,
        email: savedUser.email,
        picturePath: savedUser.picturePath,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPicture = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const cookieData = jwt.verify(token, process.env.JWT_SECRET);
      const user = cookieData?.userId
        ? await RoomEUser.findById(cookieData.userId)
        : null;
      res.status(200).json({ picturePath: user.picturePath });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
