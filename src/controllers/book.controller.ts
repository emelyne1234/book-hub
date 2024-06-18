import { Request, Response } from "express";
import { validateBookObject, IBook, Book } from "../models/book.model";
import mongoose from "mongoose";

export default class BookController {
  static async getBooks(req: Request, res: Response) {
    try {
      const books: IBook[] = await Book.find()
        .populate("author")
        .populate("reviews");

      if (!books.length) {
        res.status(404).send("No books found");
        return;
      }
      res.status(200).send({ booksCount: books.length, books: books });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async createBook(req: Request, res: Response) {
    try {
      const { error } = validateBookObject(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const {
        title,
        author_id,
        genre,
        isbn,
        publication_date,
        summary,
        average_rating,
      } = req.body;

      let cover_image: string | undefined;
      if (req.file) {
        cover_image = req.file.path;
      }

      const newBook = new Book({
        title,
        author: author_id,
        genre,
        isbn,
        publication_date,
        summary,
        cover_image,
        average_rating,
      });

      await newBook.save();

      res.status(201).send({
        message: "Book created successfully",
        createdBook: newBook,
      });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getBookById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid book id is required");
        return;
      }

      const book = await Book.findById(id)
        .populate("author")
        .populate("reviews");
      if (!book) {
        res.status(404).send("Book not found");
        return;
      }
      res.status(200).send(book);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async updateBookInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid book id is required");
        return;
      }

      const {
        title,
        author_id,
        genre,
        isbn,
        publication_date,
        summary,
        average_rating,
      } = req.body;
      const updatedData: Partial<IBook> = {
        title,
        author: author_id,
        genre,
        isbn,
        publication_date,
        summary,
        average_rating,
      };

      if (req.file) {
        updatedData.cover_image = req.file.path;
      }

      const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
        new: true,
      })
        .populate("author")
        .populate("reviews");
      if (!updatedBook) {
        res.status(404).send("Book not found");
        return;
      }
      res.status(200).send(updatedBook);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async deleteBookInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid book id is required");
        return;
      }

      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) {
        res.status(404).send("Book not found");
        return;
      }
      res.status(200).send({
        message: "Book has been deleted successfully",
        data: deletedBook,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }
}
