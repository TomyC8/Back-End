import ProductManager from "./productManager.js";

const path = "../files";

async function test1() {
    console.log(await new ProductManager(path).getProducts());
  }
  
  function test2() {
    let productos = new ProductManager(path);
    productos.addProduct("Titulo0", "desc0", 200, "Sin imagen", "Cod0", 25);
    productos.addProduct("Título1", "desc1", 50, "path imagen1", "Cod1", 500);
    productos.addProduct("Título2", "desc2", 100, "path imagen2", "Cod2", 500);
    productos.addProduct("Título3", "desc3", 150, "path imagen3", "Cod3", 500);
    productos.addProduct("Título4", "desc4", 200, "path imagen4", "Cod4", 500);
    productos.addProduct("Título5", "desc5", 250, "path imagen5", "Cod5", 500);
    productos.addProduct("Título6", "desc6", 300, "path imagen6", "Cod6", 500);
    productos.addProduct("Título7", "desc7", 350, "path imagen7", "Cod7", 500);
    productos.addProduct("Título8", "desc8", 400, "path imagen8", "Cod8", 500);

    productos.addProduct("Título3", "desc3", 150, "path imagen3", "Cod2", 500);
  
    productos.addProduct("", "descripción2", 150, "path imagen2", "Cod7", 500);
    
    productos.addProduct("descripción2", 150, "path imagen2", "Cod8", 500);
  }
  
  async function test3() {
    console.log(await new ProductManager(path).getProducts());
  }
  
  async function test4(id) {
    console.log(await new ProductManager(path).getProductById(id));
  }
  
  function test5(id, tit, dsc, prc, img, cod, stck) {
    new ProductManager(path).updateProductById(id, tit, dsc, prc, img, cod, stck);
  }
  
  function test6(id) {
    new ProductManager(path).deleteProductoById(id);
  }