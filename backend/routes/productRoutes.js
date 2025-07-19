import express from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

console.log("🟢 productRoutes loaded");


const router = express.Router();

router.post("/create", protect, isAdmin, createProduct);
router.route("/").get(protect, getProducts);
router
.route("/:id")
.get(protect, getProduct)
.put(protect, updateProduct)
.delete(protect, deleteProduct);

export default router;