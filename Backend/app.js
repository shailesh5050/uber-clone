import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.routes.js";
const app = express();
import dbConnection from "./db/db.js";

app.use(cors());
app.use(express.json());
dbConnection();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
