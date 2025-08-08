import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";
import { errorHandler, notFound } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// DB connection
db();

// Security headers and cookie parsing
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging for dev
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Prevent caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// ✅ FIXED: CORS CONFIG
const allowedOrigins = [
  'https://ubiquitous-bublanina-92e994.netlify.app', // your Netlify frontend
  'http://localhost:3000' // optional for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ required for cookies
  })
);

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("WELCOME MISA 🙌");
  });
}

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
