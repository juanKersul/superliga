import express from "express";
import upload from "../middlewares/multer";
import UploadController from "../controllers/UploadController";
import { PersonController } from "../controllers/PersonsController";

const router = express.Router();
const uploadController = new UploadController();
const personController = new PersonController();

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

router.get("/Persons", async (req, res) => {
  try {
    const select = req.query.select?.toString();
    const aggregate = req.query.aggregate?.toString();
    const where = req.query.where?.toString();
    const groupBy = req.query.groupBy?.toString();
    const orderBy = req.query.orderBy?.toString();
    const limit = parseInt(req.query.limit?.toString() || "0");
    const data = await personController.queryUsers(
      select,
      aggregate,
      where,
      groupBy,
      orderBy,
      limit
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
