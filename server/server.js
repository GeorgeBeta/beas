const express = require('express');
const bodyPaser = require('body-parser');
require('./config/config');
const mysql = require('mysql');
const path = require('path');
const hbs = require('hbs');
require('../views/helpers/helpers');

const app = express();

// Express HBS engine
hbs.registerPartials(path.resolve(__dirname, '../views/partials'));
app.set('view engine', 'hbs');

// parse application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({ extended: false }));

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

// Definicioón de las rutas de navegación
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about');
})

app.get('/signin', function(req, res) {
    res.render('signin');
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});