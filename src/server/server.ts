import express = require("express");
import path = require("path");
import people from "../routes/persons";

export default class Server {
    public app: express.Application;
    public port: number;

    constructor( port: number){
      this.port = port;
      this.app = express();

      //Rutas
      this.routes();

    }

    static init( port: number){
      return new Server( port );
    }

    private publicFolder(){
      const publicPath = path.resolve(__dirname,'../public');
      this.app.use(express.static(publicPath));
    }

    routes(){
      this.app.use(people);
    }

    start( callback:Function){
      this.app.listen(this.port,callback());
      this.publicFolder();
    }
}