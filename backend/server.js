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
import { errorHandler, routeNotFound } from "./utils/errorHandler.js";

dotenv.config();

console.log("🌍 NODE_ENV =", process.env.NODE_ENV);


const originalRouter = express.Router;
express.Router = function (...args) {
  const router = originalRouter.apply(this, args);

  // Patch `.route()`
  const origRoute = router.route;
  router.route = function (path, ...rest) {
    console.log("→ registering route (route()):", path);
    return origRoute.call(this, path, ...rest);
  };

  // Patch HTTP methods directly
  ["get", "post", "put", "delete", "patch", "all"].forEach((method) => {
    const orig = router[method];
    router[method] = function (path, ...rest) {
      console.log(`→ registering route (${method.toUpperCase()}):`, path);
      return orig.call(this, path, ...rest);
    };
  });

  return router;
};


const app = express();
const port = process.env.PORT || 5000;

// Remaining code...




//console.log(process.env.MONGO_URI);
db();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());


if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}


app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


//app.use("*", routeNotFound);
app.use(errorHandler);



//console.log(5 + 8);

app.listen(port, console.log(`app is running port ${port}`));