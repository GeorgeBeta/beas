const express = require('express');
const bodyPaser = require('body-parser');
require('../config/config');
const mysql = require('mysql');

const app = express();

app.use(bodyPaser.urlencoded({ extended: false }));

// Conectar la Base de datos
const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});

connection.connect(function(err) {
    if (err) {
        console.error('Conexión a la base de datos fallada: ' + err.stack);
        return;
    }

    console.log('Base de Datos Conectada.');
});

connection.end();

app.get('/', function(req, res) {
    res.json('Hola Arranca la Aplicación');
});

app.get('/usuario', function(req, res) {
    res.json('Devuelve DATOS usuario');
});

app.post('/usuario/', function(req, res) {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            Ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            user: req.body
        });
    }
});

app.put('/usuario/:id', function(req, res) {
    res.send(req.params.id);
});

app.delete('/usuario/:id', function(req, res) {
    res.send(req.params.id);
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});