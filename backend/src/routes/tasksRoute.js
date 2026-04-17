import express from "express";
const router = express.Router();
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;