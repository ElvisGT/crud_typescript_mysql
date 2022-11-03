import mysql = require("mysql");

export default class Mysql {

  private static _instance:Mysql;

  connection: mysql.Connection;

  constructor(){
    console.log("Clase inicializada");

    this.connection = mysql.createConnection({
      host:"localhost",
      user     : 'elvis',
      password : '123',
      database : 'node_db'
    })

    this.connectDB();
  }

  public static get instance(){
    return this._instance || (this._instance = new this());
  }

  private connectDB(){

    this.connection.connect( (err: Error) => {

      if(err){
        return console.log(err.message);
      }

      console.log("Base de datos online!!!");
    })
  }

  public static runQuery(query:String, callback: Function){
    this.instance.connection.query(query,(err: Error,results: Object[]) => {

      if(err){
        console.log("Ha ocurrido un error");
        console.log(err);
        return callback(err);
      }

      callback(null, results);
    })
  }

  public static escapeQuery(id: String){
    return this.instance.connection.escape(id);
  }
}