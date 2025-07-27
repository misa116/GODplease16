 import express from "express";
import {   
      editUserClr,
    signIn, 
    registerUser,
     listUsers,
 } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

console.log("🟢 userRoutes loaded");



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signIn);
router.get("/", protect, listUsers);
router.put("/:id", protect, editUserClr);


export default router;




