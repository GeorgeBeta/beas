const express = require('express');
const bodyPaser = require('body-parser');
require('./config/config');
const mysql = require('mysql');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({ extended: false }));

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

app.get('/', function(req, res) {
    res.json('Hola la Aplicación ha arrancado');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});