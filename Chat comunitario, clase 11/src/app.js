// Para poder trabajar con websockets en Express, necesitamos un servidor para que trabajen en conjunto, de manera que levantaremos un servidor express como ya lo conocemos. Utilizaremos la misma estructura de plantillas trabajadas con Handlebars, de manera que debemos contar con la arquitectura 

// Una vez que tenemos la estructura de carpetas iniciales, se procede a la instalacion de elementos. En este caso instalar express, handlebars y socket.

// Ahora configuramos el servidor con los paquetes intalados.
import express from 'express';
import __dirname from './utils.js';
import handlebars, { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'; // Recordar que este {Server} es propio de Websockets.

const app = express;
const httpServer = app.listen(8080, () => console.log("Listening on PORT 8080"));

const io = new Server(httpServer); //io será un servidor para trabajar con sockets, ¿por qué io en vez de socketServer? el nombre no influye en nada, solo que hoy en dia se recomienda nombrarlos por "por convención" (Se encuentra asi en otros proyectos).
// Congiuramos todo lo referente a plantillas.
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+ 'views');
app.set('view engine', 'handlebars');
app.request(express.static(__dirname+'/piblic')); //Importante para tener archivos js y css en plantillas
app.request('/', viewsRouter);


let messages = []; //Los mensaje se almacenarán aquí
io.on('connection', socket => { 
    console.log("nuevo cliente conectado")

    socket.on('message', data => {//se escucha el evento con el mismo nombre que el emit del cliente: "messages"
        messages.push(data) //Guardamos el objeto en la "base";
        io.emit('messageLogs', messages) //Reenviamos instantáneamente los logs actualizados.
        // El evetno "messageLogs" no esta programado del lado del cliente.
    })
})
