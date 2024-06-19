import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import routes from "./routes";

dotenv.config();
const { mongo_url, PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", routes);

// Connect to MongoDB
mongoose
  .connect(mongo_url!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log("Error: ", error));

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
