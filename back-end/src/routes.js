const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require ('./controllers/IncidentController');
const ProfileController = require ('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//rota para listar todas as ongs do banco de dados
routes.get('/ongs',OngController.index);
//rota para criar as ongs no banco de dados
routes.post('/ongs', OngController.create);


//rota para listar Incidents no banco de dados
routes.get('/incidents', IncidentController.index);
//rota para adicionar Incidents no banco de dados
routes.post('/incidents', IncidentController.create);
//rota do tipo delete, ou seja, deletar no DB
routes.delete('/incidents/:id', IncidentController.delete);

//listagem de casos especificos de uma ONG
routes.get('/profile', ProfileController.index);

//rota de Login, Criar
routes.post('/sessions', SessionController.create);


module.exports = routes;  