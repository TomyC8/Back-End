const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor() {
    this.path = "./products.json";
    this.products = [];
    this.loadProducts();
  }

  addProduct(productData) {
    if (!this.isValidProduct(productData)) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const newProduct = {
      id: ++ProductManager.ultId,
      ...productData,
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedData) {
    const Index = this.products.findIndex(product => product.id === id);

    if (Index !== -1) {
      this.products[Index] = { ...this.products[Index], ...updatedData };
      this.saveProducts();
    } else {
      console.error("Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo, simplemente se ignora
      console.error("Error al cargar productos:", error.message);
      this.products = [];
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf8');
    } catch (error) {
      console.error("Error al guardar productos:", error.message);
    }
  }

  isValidProduct(productData) {
    return (
      productData.title &&
      productData.description &&
      productData.price &&
      productData.thumbnail &&
      productData.code &&
      productData.stock !== undefined
    );
  }
}

// Testing:

const manager = new ProductManager("./products.json");

// Agregar productos
manager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "imagen1.jpg",
  code: "ABC123",
  stock: 10,
});

manager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 150,
  thumbnail: "imagen2.jpg",
  code: "DEF456",
  stock: 20,
});

manager.addProduct({
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 460,
  thumbnail: "imagen3.jpg",
  code: "TBC118",
  stock: 10,
});

console.log(manager.getProducts());


module.exports = ProductManager;