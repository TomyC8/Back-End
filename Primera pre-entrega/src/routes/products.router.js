const express = require("express");
const router = express.Router();

const newLocal = "../controllers/productmanager";
const ProductManager = require(newLocal);
const productManager = new ProductManager("./src/models/productos.json");


//1) Obtengo todos los productos del JSON
router.get('/products', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
      const products = await manager.getProducts();
      if (limit) {
        res.json(products.slice(0, limit));
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  });
  
  // Endpoint para obtener un producto por su ID
  router.get('/products/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      const product = await manager.getProductById(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  });
  
//3) Agregar un nuevo producto: 

router.post("/products", async (req, res) => {
    const nuevoProducto = req.body; 

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({message: "Producto agregado exitosamente"});
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"});
    }
})


//4) Actualizar por ID

router.put("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body; 

    try {
        await productManager.updateProduct(parseInt(id), productoActualizado);
        res.json({
            message: "Producto actualizado exitosamente"
        });
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"});
    }
})

//5) Eliminar producto: 

router.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid; 

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"});
    }
})
module.exports = router;