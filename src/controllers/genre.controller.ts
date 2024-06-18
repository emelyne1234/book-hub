import { Request, Response } from "express";
import { validateGenreObject, IGenre, Genre } from "../models/genre.model";
import mongoose from "mongoose";

export default class GenreController {
  static async getGenres(req: Request, res: Response) {
    try {
      const genres: IGenre[] = await Genre.find();

      if (!genres.length) {
        res.status(404).send("No genres found");
        return;
      }
      res.status(200).send({ genresCount: genres.length, genres: genres });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async createGenre(req: Request, res: Response) {
    try {
      const { error } = validateGenreObject(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const { name } = req.body;

      const newGenre = new Genre({
        name,
      });

      await newGenre.save();

      res.status(201).send({
        message: "Genre created successfully",
        createdGenre: newGenre,
      });
    } catch (error) {
      console.error("Error creating genre:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getGenreById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid genre id is required");
        return;
      }

      const genre = await Genre.findById(id);
      if (!genre) {
        res.status(404).send("Genre not found");
        return;
      }
      res.status(200).send(genre);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async updateGenreInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid genre id is required");
        return;
      }

      const { name } = req.body;
      const updatedData: Partial<IGenre> = { name };

      const updatedGenre = await Genre.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!updatedGenre) {
        res.status(404).send("Genre not found");
        return;
      }
      res.status(200).send(updatedGenre);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async deleteGenreInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid genre id is required");
        return;
      }

      const deletedGenre = await Genre.findByIdAndDelete(id);
      if (!deletedGenre) {
        res.status(404).send("Genre not found");
        return;
      }
      res.status(200).send({
        message: "Genre has been deleted successfully",
        data: deletedGenre,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }
}
