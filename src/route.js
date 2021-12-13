const express = require('express');
const QuestionController = require('./controllers/QuestionController.js');
const RoomController = require('./controllers/RoomController');

const route = express.Router();

//req = requisição 
//res = resposta 
// 'req/res' = 'index/partedosite' res.render("nomeDaPagina") -> renderiza uma página do site
// ex página sobre mim
// quando não tem nada apos a barra é o index (página inicial)

route.get('/', (req, res) => res.render('index', { page: 'enter-room' }));
route.get('/create-room', (req, res) => res.render("index", { page: 'create-room' }));

route.post('/create-room', RoomController.create);
route.get('/room/:room', RoomController.open);
route.post('/enter-room', RoomController.enter);

//Formato do formulário dentro da modal
route.post('/question/create/:room', QuestionController.create);
route.post('/question/:room/:question/:action', QuestionController.index);

module.exports = route;//permite a exportação da constante