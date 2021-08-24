const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = "/api/usuarios";

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static(path.join(__dirname + "/public/")));
  }

  routes() {
    this.app.use(this.usuariosPath, require("./controllers/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server up in port ", this.port);
    });
  }
}

module.exports = Server;
