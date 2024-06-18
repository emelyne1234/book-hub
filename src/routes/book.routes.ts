import express from "express";
import { upload } from "../middlewares/multer.config";
import BookController from "../controllers/book.controller";

const router = express.Router();

router.get("/books", BookController.getBooks);
router.post("/books", upload.single("cover_image"), BookController.createBook);
router.get("/books/:id", BookController.getBookById);
router.put(
  "/books/:id",
  upload.single("cover_image"),
  BookController.updateBookInfo
);
router.delete("/books/:id", BookController.deleteBookInfo);

export default router;
