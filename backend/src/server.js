import dotenv from "dotenv";
import express from "express";
import tasksRoute from "./routes/tasksRoute.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();


// Middleware
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

app.use("/api/tasks", tasksRoute);

connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});




