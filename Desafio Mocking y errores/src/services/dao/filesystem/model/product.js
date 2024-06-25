class Product {
    static id = 0;
    constructor (
        titulo, 
        desc, 
        precio, 
        foto, 
        codigo, 
        unidades, 
        status, 
        category) {
            this.id = ++Product.id;
            this.title = titulo;
            this.desc = desc;
            this.precio = precio;
            this.foto = foto;
            this.codigo = codigo;
            this.unidades = unidades;
            this.status = status;
            this.category = category;
    }
}

export default Product;