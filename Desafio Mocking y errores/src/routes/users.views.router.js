import { Router } from "express";

import { 
    passportCall, 
    authorization, 
    authToken 
} from "../utils.js";

import {
    login,
    register,
    profile,
} from "../controllers/user.views.controller.js";

const router = Router();

router.get("/login", login);
router.get("/register", register);
router.get("/", 
    passportCall("jwt"),
    authorization("user"),
    profile
);

export default router;