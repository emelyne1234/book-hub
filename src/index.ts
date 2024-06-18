import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

//getting env variables
dotenv.config();
const { mongo_url, PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);

mongoose
  .connect(mongo_url!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log("error: ", error));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
