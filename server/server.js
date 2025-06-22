import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";

// initialize express
const app = express();

// connect to db
await connectDB();

// middlewware
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
