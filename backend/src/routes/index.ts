import express from "express";
import upload from "../middlewares/multer";
import UploadController from "../controllers/UploadController";

const router = express.Router();
const uploadController = new UploadController();

router.post("/Csv", upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
      const result = await uploadController.uploadFile(req.file);
      res.json(result);
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error uploading file" });
  }
});

export default router;
