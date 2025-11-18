import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todoRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

connectDB();

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send("Todo API running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     