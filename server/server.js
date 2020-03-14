const express = require('express');
const bodyPaser = require('body-parser');

const app = express();
//require('../config/config');
require('../config/config');
app.use(bodyPaser.urlencoded({ extended: false }));

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