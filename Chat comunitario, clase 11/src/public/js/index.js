// Para la carpeta de index.handlebars. Creamos un index.js en la carpeta public/js/ y la referenciamos en en el indexhandlebars (lo que es la ultima linea de codigo);
// El cliente también necesita instancia su socket, entonces colocamos en un script con la sintaxis indicada en la imagen (anteultima linea de codigo).

import { Socket } from "socket.io";

// El script de socket siempre debe estar antes que el script propio.
// Ahora que hemos importado socket.io desdé nuestro script del lado del cliente, podemos probar utilizandolo en nuestro archivo index.js. En este archivos es donde tendremos el socket/cliente para conectar con socket/servidor.

// const socket = io();
/**
 * io hace referencia a "socket.io", como dijimos, lo llamamos asi por convención
 * la linea 1 permite instancia el socket y guardarlo en la constante "socket"
 * Dicho socket es el que utilizaremos para poder comunicarnos con el socket del servidor.
 * (en este punto somos "clientes", ya que representamos una vista).
 */

// Ahora en el handlebars instalamos el sweetalert, el cual nos permitira utilizar alertas más esteticas y con mas funcionalidades, en este caso se usa para dos cosas particulares:
/**
 * Para bloquear la pantalla del chat hasta quye el usuario se identifique
 * Para notificar a los usuarios cuando alguien se conecte al chat
 */

// En la linea 5, instalamos sweetalert en nuestra vista de handlebars.

// Ahora vamos a utilizar el objeto swal.
const socket = io();
let user; //Este "user" será con el que el cliente se identificará para saber quien escribio el mensaje
let chatBox = document.getElementById('chatBox'); //Obtenemos la referencia del cuadro donde se escribirá.

Swal.fire({
    title: "Identifícate",
    imput: "text",//Indicamos que el cliente necesita escribir un texto para poder avanzar de esa alerta.
    text:"Ingresa el usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
        // Esta validación ocurre si el usuario decide dar en "continuar" sin haber colocado un nombre de usuario
    },
    allowOutsideClick: false // Impide que el usuario salga de la alerta al dar "click" fuera de esta.
}).then(result => {
    user = result.value
    // Una vez que el usuario se identifica, lo asignamos a la variable user.
})

chatBox.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){ //el mensaje se enviará cuando usuario aprete "enter" en la caja de chat. 
        if(chatBox.value.trim().length > 0){//Corroboramos que el mensaje no esté vacío o sólo contenga espacios.
            socket.emit("message", {user:user,message:chatBox.value});//Emitimos nuestro primer evento
            chatBox.value = "";
        }
    }
})

/*SOCKET LISTENERS*/
socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.array.forEach(message => {
        messages = messages+ `${message.user} dice: ${message.message}</br>` 
    });
    log.innerHTML = messages;
})