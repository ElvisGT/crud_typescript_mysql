import router from './routes/persons';
import Server from './server/server';

const port:number = 3003;

const server = Server.init(port);


//Esta es una forma de manejar las rutas
// server.app.use(router);

server.start( ()=> {
  console.log("Servidor corriendo en puerto",port);
});