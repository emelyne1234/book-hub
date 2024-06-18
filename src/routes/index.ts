import express from "express";
import userRoutes from "./user.routes";
import bookRoutes from "./book.routes";
import genreRoutes from "./genre.routes";
import reviewRoutes from "./review.routes";

const router = express.Router();

router.use(userRoutes);
router.use(bookRoutes);
router.use(genreRoutes);
router.use(reviewRoutes);

export default router;
