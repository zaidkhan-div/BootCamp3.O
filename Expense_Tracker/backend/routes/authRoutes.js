import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser")