const express = require('express');
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let db = mysql.createConnection({
    host: "localhost",
    database: "inventario",
    user:"root",
    password:""
});

db.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa");
    }
});

module.exports = db;

