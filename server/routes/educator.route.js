import express from "express";
import { updateRoleToEducator } from "../controllers/educator.controller.js";

const educatorRouter = express.Router();

// Add Educator Role
educatorRouter.get("/update-role", updateRoleToEducator);

export default educatorRouter;
