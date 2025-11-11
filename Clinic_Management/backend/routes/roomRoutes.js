import express from "express";
import { createRoom, getAllRooms, deleteRoom } from "../controllers/roomControllers.js";

const router = express.Router();

router.get("/all", getAllRooms);
router.post("/create", createRoom);
router.delete("/delete/:id", deleteRoom);

export default router;
