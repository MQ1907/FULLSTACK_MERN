import dotenv from "dotenv";
import express from "express";
import tasksRoute from "./routes/tasksRoute.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

dotenv.config();


// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({origin: "http://localhost:5173"}));
}

app.use(express.json());

app.use("/api/tasks", tasksRoute);
if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/vite-project/dist/index.html"));
});
}


connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});




