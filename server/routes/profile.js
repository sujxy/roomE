import { changePicture, getPicture } from "../controllers/profile.js";
import multer from "multer";
import express from "express";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.patch("/changePicture", upload.single("picture"), changePicture);
router.get("/getPicture", getPicture);

export default router;
