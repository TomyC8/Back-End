import fs from "fs";
import Cart from "../model/cart.js"

class CartManger {
    dirName = "";
    fileName = "carts.json";
    ruta = "";

    constructor(dirName){
        this.dirName= dirName;
        this.ruta = this.dirName + "/" + this.fileName;
        this.crearDirectorio(this.dirName);
        this.validarExistenciaArchivo(this.ruta);
        this.arrayCarts = Json.parse(fs.readFileSync(this.ruta, "utf-8"));
    }

    crearDirectorio = async(dirName) => {
        try {
            await fs.promises.mkdir(dirName, { recursive: true});
        } catch (err) {
            console.log(`Error al crear directorio del carrito: ${err}`);
        }
    };

    addCart = async () => {
        try {
            this.validarExistenciaArchivo(this.ruta);

            this.arrayCarts.push(new Cart());
            console.log(`Se cargo exitosamente el carrito`);
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.arrayCarts));
        } catch (err) {
            console.error(`Error agregando carrito: ${err}`);
        }
    };

    addProductCar = async (cid, pid) => {
        try {
            let flag = 0;
            this.validarExistenciaArchivo(this.ruta);
            let arrayC = JSON.parse( await fs.promises.readFile(this.ruta, "utf-8"));
            for (const obj of arrayC) {
                if (obj.id === cid) {
                    for (const ob of obj.products) {
                        if (ob.id === pid) {
                            ob.quantity++;
                            flag = 1;
                        }
                    }
                // No encuentra el producto en el carrito => lo agrega
                if (flag === 0) {
                    let newP = {
                        id: pid,
                        quantity: 1,
                    };
                    obj.products.push(newP);
                    }
                }
            }
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayC));
        } catch (err) {
            console.error(`Error! No se pudo agregar el producto al carrito ${err}`);
        }
    }
    getCarts = async () => {
        try {
            this.validarExistenciaArchivo(this.ruta);
            return JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
        } catch (err) {
            console.log(`Error al obtener los carritos: ${err}`);
        }
    };

    getCartById = async (id) => {
        try {
            let prod = {};
            this.validarExistenciaArchivo(this.ruta);
            let arrayP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            for (const obj of arrayP) if (obj.id === id) prod = {...obj};

            return prod;
        } catch (err) {
            console.error(`Error al obtener el carrito por Id: ${err}`);
        }
    };
}

export default CartManger;