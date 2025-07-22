import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

// ✅ Load environment variables
dotenv.config();

console.log("✅ NODE_ENV =", process.env.NODE_ENV);
console.log("✅ MONGO_URI =", process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to DB
db();

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://ubiquitous-bublanina-92e994.netlify.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// ✅ Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// ✅ Error Handling
app.use(errorHandler);

// ✅ Start server
app.listen(port, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV} on port ${port}`)
);
