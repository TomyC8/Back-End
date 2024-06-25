import { Router } from "express";
import { authToken, authSession } from "../utils.js";
import { passportCall, authorization } from "../utils.js";

import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
} from "../controllers/products.controller.js";

const router = Router();
// authToken
router.get("/", authToken, getAllProducts);

//Obtiene producto por ID 
router.get("/:pid", getProductById);

//Carga producto
router.post("/", authSession, addProduct);

//Actualiza producto por Id
router.put("/:pid", authSession, updateProductById);

//Elimina producto por Id
router.delete("/:pid", authSession, deleteProductById);

export default router;