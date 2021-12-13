const express = require('express');
const route = require('./route');/*constante route recebe uma exigência de route 
variável do route.js*/
const path = require('path');

const server = express();

server.set('view engine', 'ejs');

server.use(express.static("public"));

server.set('views', path.join(__dirname, 'views'));


server.use(express.urlencoded({extended: true}))

server.use(route);//aqui utilizamos a variável route

server.listen(3000, ()=> console.log("RODANDO"));//listen é uma funcionalidade de express()
