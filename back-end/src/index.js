const express = require('express');
const cors = require('cors'); //determina acesso de quem poderá ter acesso á aplicação
const routes = require('./routes');

const app =express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333)
