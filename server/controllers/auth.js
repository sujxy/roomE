import bcrypt from "bcrypt";
import RoomEUser from "../models/roomeUsers.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new RoomEUser({
      username,
      email,
      password: hashPassword,
      picturePath: null,
    });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RoomEUser.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.JWT_SECRET
      );
      // res.status(200).json({ user, token });

      const { _id, username, email, picturePath } = user;
      res.cookie("token", token);
      res.status(200).json({ userId: _id, username, email, picturePath });
    } else {
      res.status(404).json({ error: "incorrect password" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const refreshUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      if (userData) {
        const { _id, username, email, picturePath } = await RoomEUser.findById(
          userData.userId
        );
        res.status(200).json({ userId: _id, username, email, picturePath });
      }
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
