import { Schema, model, Types } from "mongoose";
import Joi from "joi";

export interface IReview {
  _id?: string;
  user?: Types.ObjectId;
  book?: Types.ObjectId;
  rating: number;
  review_text: string;
  review_date: Date;
}

// Mongoose schema for Review
const reviewSchema: Schema<IReview> = new Schema<IReview>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    book: { type: Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    review_text: { type: String, maxlength: 1000, required: true },
    review_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Review model for mongoose interaction with MongoDB
export const Review = model<IReview>("Review", reviewSchema);

// Function to validate review object from request body
export const validateReviewObject = (review: IReview) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    book: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
    review_text: Joi.string().max(1000).required(),
    review_date: Joi.date().optional(),
  });

  return schema.validate(review);
};
