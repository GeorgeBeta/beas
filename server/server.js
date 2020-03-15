const express = require('express');
const bodyPaser = require('body-parser');
require('./config/config');
const mysql = require('mysql');

const app = express();

app.use(bodyPaser.urlencoded({ extended: false }));

app.use(require('./routes/usuario.route'));

app.get('/', function(req, res) {
    res.json('Hola la Aplicación ha arrancado');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});