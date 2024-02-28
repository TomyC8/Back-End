class ProductManager {
    static ultId = 0;
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los campos son obligatorios");
            return;
        }

      if(this.products.some(item => item.code === code)) {
        console.error("Ya existe un producto con ese código.");
        return;
      }

      const newProduct = {
        id: ++ProductManager.ultId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      this.products.push(newProduct);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(item => item.id === id);

      if(!product) {
        console.log("Product not found");
      } else {
        console.log("Este es el producto", product);
      }
    }
}

//Testing:

//1)Crear una instancia de la clase "ProductManager"

const manager = new ProductManager();

//2)Se llamará "getProducts" recien creada la instancia, debe devovler un arreglo vacio.

console.log(manager.getProducts());

manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente sin repetirse.

manager.addProduct("pelotas", "de voley", 1500, "sin imagen", "mks110", 15);
manager.addProduct("remeras", "de entrenamiento", 2000, "sin imagen", "miz629",30);

//4)Se llamará el metodo "getProducts" nuevamente, esta vez debe aparecer el producto recien agregado.

console.log(manager.getProducts());

//5)Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo.

manager.getProductById(2);
//Para demostrar que sucede cuando no lo encuentra.
manager.getProductById(300);
