import { Router } from "express";

import {
    createCart,
    getAllCarts,
    getCartById,
    addProductInCartById,
    deleteAllProducts,
    deleteProductByIdCartId,
    updateQuantityProductById,
    addProductsByArray,
    addPruchaseByCartById,
} from "../controllers/carts.controller.js";

const router = Router();

//Cargar carrito
router.post("/", createCart);

//Obtener todos los carritos
router.get("/", getAllCarts);

//Obtener carrito por Id
router.get("/:cid", getCartById);

//Agregar un producto al carrito ID
router.post("/:cid/products/:pid", addProductInCartById);

//Borrar todos los productos del carro
router.delete("/:cid", deleteAllProducts);

//Borrar del carrito el producto
router.delete("/:cid/product/:pid", deleteProductByIdCartId);

//Actualizar la cantidad de un producto
router.put("/:cid/product/:pid", updateQuantityProductById);

//Agregar un producto desde un array
router.put("/:cid", addProductsByArray);

//Realizar la compra del carrito Id
router.post("/:cid/purchase", addPruchaseByCartById);


export default router;