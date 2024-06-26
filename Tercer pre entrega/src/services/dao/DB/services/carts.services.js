import cartsModel from "../models/carts.js";

export default class StudentService {
  constructor() {
  }

  addCart = async () => {
    try {
      let result = await cartsModel.create({});
      console.log(`Se cargo el carrito`);
      return result;
    } catch (err) {
      console.error(`Error agregando Carrito: ${err}`);
    }
  };

  devuelveIndex = (objeto, idFind) => {
    let index = -1;
    let ind = -1;
    for (const ob of objeto) {
      index++;
      if (ob.product._id == idFind) {
        ind = index;
        break;
      }
    }
    return ind;
  };

  addProductCar = async (cid, pid) => {
    try {
      let cart = await this.getCartById(cid);
      if (cart.lenght !== 0) {
        let productInCart = cart.products;

        let ind = this.devuelveIndex(productInCart, pid);

        if (ind >= 0) {
          let obj = productInCart[ind];
          obj.quantity++;
          productInCart[ind] = obj;

          let result = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: productInCart }
          );
          return result;
        } else {
            let newP = {
            product: pid,
            quantity: 1,
          };

          let result = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { $push: { products: newP } }
          );
          return result;
        }
      }
    } catch (err) {
      console.error(`ERROR no se pudo agregar el producto al carrito ${err}`);
    }
  };

  getCartById = async (id) => {
    try {
      let result = await cartsModel.findOne({ _id: id }).lean();
      return result;
    } catch (err) {
      console.error(`ERROR obteniendo el Carrito por ID: ${err}`);
      return [];
    }
  };

  getCarts = async () => {
    try {
      let result = await cartsModel.find();
      return result;
    } catch (err) {
      console.error(`Error obteniendo los Carritos: ${err}`);
      return [];
    }
  };

  deleteProducts = async (cid) => {
    try {
      let cart = await this.getCartById(cid);
      let arr = new Array();
      let result = await cartsModel.findByIdAndUpdate(
        { _id: cid },
        { products: arr }
      );
      let fin = await this.getCartById(cid);
      return fin;
    } catch (err) {
      console.error(`Error no se pudo quitar los productos del carrito ${err}`);
    }
  };

  deleteProductById = async (cid, pid) => {
    try {
      let cart = await this.getCartById(cid);

      if (cart.lenght !== 0) {
        let productInCart = cart.products;

        let ind = this.devuelveIndex(productInCart, pid);

        if (ind >= 0) {
          productInCart.splice(ind, 1);

          let result = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: productInCart }
          );
          return result;
        }
      }
    } catch (err) {
      console.error(`Error no se pudo quitar el producto del carrito ${err}`);
    }
  };

  updateQuantityProduct = async (cid, pid, qty) => {
    try {
      let cart = await this.getCartById(cid);

      if (cart.lenght !== 0) {
        let productInCart = cart.products;
        let ind = this.devuelveIndex(productInCart, pid);

        if (ind >= 0) {
          let obj = productInCart[ind];
          obj.quantity = qty;
          productInCart[ind] = obj;

          let result = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: productInCart }
          );

          let fin = await this.getCartById(cid);
          return fin;
        }
      }
    } catch (err) {
      console.error(
        `Error no se pudo actualizar la cantidad del producto en el carrito ${err}`
      );
    }
  };

  updateProductByArray = async (cid, arr) => {
    try {
      let cart = await this.getCartById(cid);

      //Para encontrar el carrito con el Id indicado
      if (cart.lenght !== 0) {
        let resu = await cartsModel.findOne({ _id: cid });

        for (const ob of arr) {
          resu.products.push(ob);
        }

        let result = await cartsModel.updateOne({ _id: cid }, resu);

        let final = await this.getCartById(cid);
        return final;
      }
    } catch (err) {
      console.error(
        `Error no se pudieron agregar los productos al carrito ${err}`
      );
    }
  };
}