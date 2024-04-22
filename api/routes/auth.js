import express from "express";
import { logIn, register } from "../controllers/auth.js";

const router = express.Router();

//localhost:5000/api/auth/register
router.post("/register", register)

//localhost:5000/api/auth/login
router.post("/login", logIn)

export default router;