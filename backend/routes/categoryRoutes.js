 import express from "express";
import {
  allCategory,
  createCategory,
} from "../controllers/categoryController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

console.log("🟢 categoryRoutes loaded");


const router = express.Router();

router.route("/create").post(protect, isAdmin, createCategory);
router.route("/").get(protect, allCategory);

export default router;