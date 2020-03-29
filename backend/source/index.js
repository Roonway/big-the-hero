//Importa aqrquivos e pacotes
const express = require('express');
const cors =  require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
// Informa a nossa aplicação que estaremos usando JSON para o corpo das requisição;
app.use(express.json());
app.use(routes);

app.listen(3333);