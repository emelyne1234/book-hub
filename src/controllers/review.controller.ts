import { Request, Response } from "express";
import { validateReviewObject, IReview, Review } from "../models/review.model";
import mongoose from "mongoose";

export default class ReviewController {
  static async getReviews(req: Request, res: Response) {
    try {
      const reviews: IReview[] = await Review.find()
        .populate("user")
        .populate("book");

      if (!reviews.length) {
        res.status(404).send("No reviews found");
        return;
      }
      res.status(200).send({ reviewsCount: reviews.length, reviews: reviews });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async createReview(req: Request, res: Response) {
    try {
      const { error } = validateReviewObject(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const { user_id, book_id, rating, comment } = req.body;

      const newReview = new Review({
        user: user_id,
        book: book_id,
        rating,
        comment,
      });

      await newReview.save();

      res.status(201).send({
        message: "Review created successfully",
        createdReview: newReview,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getReviewById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid review id is required");
        return;
      }

      const review = await Review.findById(id)
        .populate("user")
        .populate("book");
      if (!review) {
        res.status(404).send("Review not found");
        return;
      }
      res.status(200).send(review);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async updateReviewInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid review id is required");
        return;
      }

      const { user_id, book_id, rating, review_text } = req.body;
      const updatedData: Partial<IReview> = {
        user: user_id,
        book: book_id,
        rating,
        review_text,
      };

      const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
        new: true,
      })
        .populate("user")
        .populate("book");
      if (!updatedReview) {
        res.status(404).send("Review not found");
        return;
      }
      res.status(200).send(updatedReview);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async deleteReviewInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid review id is required");
        return;
      }

      const deletedReview = await Review.findByIdAndDelete(id);
      if (!deletedReview) {
        res.status(404).send("Review not found");
        return;
      }
      res.status(200).send({
        message: "Review has been deleted successfully",
        data: deletedReview,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }
}
