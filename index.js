import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from './UserModel.js'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(cors());

app.post("/submit-form", async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name
      });
      await newUser.save();
      res.status(201).send("User saved successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

//DB connection
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("Database connected Successfully"))
  .catch((err) => `Database connection failed: ${err.message}`);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.listen(PORT, () => console.log(`App is listening at ${PORT}`));
