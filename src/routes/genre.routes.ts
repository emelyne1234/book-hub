import express from "express";
import GenreController from "../controllers/genre.controller";

const router = express.Router();

router.get("/genres", GenreController.getGenres);
router.post("/genres", GenreController.createGenre);
router.get("/genres/:id", GenreController.getGenreById);
router.put("/genres/:id", GenreController.updateGenreInfo);
router.delete("/genres/:id", GenreController.deleteGenreInfo);

export default router;
