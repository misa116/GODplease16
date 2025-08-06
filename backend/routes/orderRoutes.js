import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  allOrders,
  myOrders,
  newOrder,
  orderDetails,
  updateOderItemPrice,
  updateOrder,
  updateOrderProcurement,
  updateOrderReceived,
  deleteOrder,
} from "../controllers/orderController.js";

 console.log("🟢 orderRoutes loaded");


const router = express.Router();

// Create order
router.post("/create", protect, newOrder);

// More specific routes FIRST
router.route("/mine").get(protect, myOrders);
router.route("/deliver-dept/:id").put(protect, updateOrderProcurement);
router.route("/:id/receive").put(protect, updateOrderReceived);
router.route("/:id/updatestock").put(protect, updateOrder);

// ✅ Fixed this line:
router.put("/updateItemPrice/:itemId", protect, updateOderItemPrice);

// General routes LAST
router.get("/", protect, allOrders);
router
  .route("/:id")
  .get(protect, orderDetails)
  .delete(protect, deleteOrder);

export default router;

