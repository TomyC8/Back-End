import { Router } from "express";

import { 
    passportCall,
    authorization,
} from "../utils.js";

import {
    getProductByCart,
    getProducts,
    getHome,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", getHome);

router.get(
    "/products",
    passportCall("jwt"),
    authorization("user"),
    getProducts
);

// Para obtener todos los productos del carrito indicado y mostrarlos en el navegador.
router.get(
    "/carts/cid",
    passportCall("jwt"),
    authorization("user"),
    getProductByCart
);

export default router;