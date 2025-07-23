import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Import DB connection
import { db } from "./db/db.js";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";

// Error handlers
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Connect to database
db();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ CORS config for Netlify frontend
app.use(
  cors({
    origin: "https://ubiquitous-bublanina-92e994.netlify.app", // your Netlify domain
    credentials: true, // send cookies
  })
);

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// ✅ Serve frontend (optional, only if deployed together)
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

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
