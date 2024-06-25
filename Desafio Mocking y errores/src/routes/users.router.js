import { Router } from "express";
import { authToken } from "../utils";
import { ingreso } from "../controllers/user.controller.js"

const router = Router();

router.get("/:userId", authToken, ingreso);

export default router;