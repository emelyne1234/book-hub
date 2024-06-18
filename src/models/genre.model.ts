import { Schema, model, Types } from "mongoose";
import Joi from "joi";

export interface IGenre {
  _id?: string;
  name: string;
  description: string;
}

// Mongoose schema for Genre
const genreSchema: Schema<IGenre> = new Schema<IGenre>(
  {
    name: { type: String, minlength: 1, maxlength: 255, required: true },
    description: { type: String, maxlength: 1000, default: "" },
  },
  {
    timestamps: true,
  }
);

// Genre model for mongoose interaction with MongoDB
export const Genre = model<IGenre>("Genre", genreSchema);

// Function to validate genre object from request body
export const validateGenreObject = (genre: IGenre) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().max(1000).optional(),
  });

  return schema.validate(genre);
};
