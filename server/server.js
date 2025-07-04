import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { ClerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educator.route.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/course.route.js";
import userRouter from "./routes/user.route.js";

// initialize express
const app = express();

// connect to db
await connectDB();
await connectCloudinary();

// middlewware
app.use(cors());
app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/clerk", express.json(), ClerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
