const socket = io();

socket.emit("inicio", "Cliente conectado");

document.getElementById("btnDelete").addEventListener("click", () => {
  socket.emit("deleteProduct", document.getElementById("idProd").value);
});

document.getElementById("btnAdd").addEventListener("click", () => {
  let obj = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    status: document.getElementById("status").value,
    category: document.getElementById("category").value,
  };
  socket.emit("addProduct", obj);
});

socket.on("productos", (data) => {
  document.getElementById("tblDatos").innerHTML = creaTabla(data);
});

socket.on("error", (data) => {
  if (data !== "0") alert(data);
});

function creaTabla(data) {
  let stringTabla = `<tr> <th> Id</th><th> Nombre </th><th> Descripción </th><th> Precio </th><th> Imágen </th><th> Código </th><th> Stock </th><th> Estado </th><th> Categoría </th> </tr>`;

  data.products.forEach((log) => {
    stringTabla += `<tr> <td> ${log.id} </td><td> ${log.title} </td><td> ${log.description}  </td><td> ${log.price} </td><td> ${log.thumbnail}  </td><td> ${log.code}  </td><td> ${log.stock} </td><td> ${log.status}  </td><td> ${log.category} </td> </tr>`;
  });

  return stringTabla;
}