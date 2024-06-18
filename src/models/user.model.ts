import { Schema, model, Types } from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export interface IUser {
  _id?: string;
  username?: string;
  email?: string;
  password: string;
  profile?: string;
  role?: "admin" | "author" | "reader";
  bio?: string;
  books?: Types.ObjectId[];
  reviews?: Types.ObjectId[];
}

// Mongoose schema for user with validation rules and methods
const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: { type: String, minlength: 3, maxlength: 255, required: true },
    email: { type: String, maxlength: 100, required: true },
    password: { type: String, minlength: 8, maxlength: 255, required: true },
    profile: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
    bio: { type: String, maxlength: 500, default: "" },
    books: [{ type: Types.ObjectId, ref: "Book" }],
    reviews: [{ type: Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// User model for mongoose interaction with MongoDB
export const User = model<IUser>("User", userSchema);

// Function to validate user object from request body
export const validateUserObject = (user: IUser) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(255).required(),
    profile: Joi.string().optional(),
    role: Joi.string().valid("admin", "author", "reader").optional(),
    bio: Joi.string().max(500).optional(),
  });

  return schema.validate(user);
};

// Function to validate sign-in object from request body
export function validateSignIn(user: IUser) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
}
