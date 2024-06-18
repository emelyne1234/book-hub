import { Schema, model, Types } from "mongoose";
import Joi from "joi";

// Interface for Book
export interface IBook {
  _id?: string;
  title: string;
  author?: Types.ObjectId;
  genre?: Types.ObjectId;
  isbn: string;
  publication_date: Date;
  summary: string;
  cover_image: string;
  average_rating: number;
}

// Mongoose schema for Book
const bookSchema: Schema<IBook> = new Schema<IBook>(
  {
    title: { type: String, minlength: 1, maxlength: 255, required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    genre: { type: Types.ObjectId, ref: "Genre", required: true },
    isbn: { type: String, maxlength: 13, required: true },
    publication_date: { type: Date, required: true },
    summary: { type: String, maxlength: 1000, required: true },
    cover_image: { type: String, default: "" },
    average_rating: { type: Number, min: 0, max: 5, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Book model for mongoose interaction with MongoDB
export const Book = model<IBook>("Book", bookSchema);

// Function to validate book object from request body
export const validateBookObject = (book: IBook) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    isbn: Joi.string().max(13).required(),
    publication_date: Joi.date().required(),
    summary: Joi.string().max(1000).required(),
    cover_image: Joi.string().optional(),
    average_rating: Joi.number().min(0).max(5).optional(),
  });

  return schema.validate(book);
};
