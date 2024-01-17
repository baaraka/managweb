import express from "express";
import itemRoutes from "./routes/items.js";
import authRoutes from "./routes/auth.js";
import paypalRoutes from "./routes/paypal.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/paypal", paypalRoutes);

app.listen(5000, () => {
  console.log("server connected");
});
