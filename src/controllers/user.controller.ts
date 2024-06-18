import { Request, Response } from "express";
import { validateUserObject, IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export default class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users: IUser[] = await User.find()
        .populate("books")
        .populate("reviews");

      if (!users.length) {
        res.status(404).send("No users found");
        return;
      }
      res.status(200).send({ usersCount: users.length, users: users });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async registerUser(req: Request, res: Response) {
    try {
      const { error } = validateUserObject(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const profile = req.file?.path || "uploads/defaultProfile.png";
      const { username, email, password, role, bio } = req.body;

      // Check if email has been used
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).send({ message: "Email has been taken" });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create and save the user to the database
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        profile,
        bio,
      });

      await newUser.save();

      // Send the created user object back
      res.status(201).send({
        message: "Account created successfully",
        createdUser: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid user id is required");
        return;
      }

      const user = await User.findById(id)
        .populate("books")
        .populate("reviews");
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      res.status(200).send(user);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async updateUserInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Check if the id is valid
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid user id is required");
        return;
      }

      let profile;
      if (req.file) {
        profile = req.file.path;
      }

      let { username, email, password, role, bio } = req.body;
      if (password) {
        password = await bcrypt.hash(password, 12);
      }

      const updatedData: Partial<IUser> = {
        username,
        email,
        password,
        role,
        profile,
        bio,
      };

      // Update the user if the id is valid
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      })
        .populate("books")
        .populate("reviews");
      if (!updatedUser) {
        res.status(404).send("User not found");
        return;
      }
      res.status(200).send(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }

  static async deleteUserInfo(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Check if the id is valid
      if (!id || !mongoose.isValidObjectId(id)) {
        res.status(400).send("A valid user id is required");
        return;
      }

      // Delete the user from the database
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        res.status(404).send("User not found");
        return;
      }
      res.status(200).send({
        message: "User has been deleted successfully",
        data: deletedUser,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  }
}
