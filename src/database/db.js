const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.URL_DB;

class connection {
    test(){
        mongoose
            .connect(url)
            .then(console.log("banco de dados conectado com sucesso"))
            .catch((error) => console.log(error));
    }
}

module.exports =new  connection;
