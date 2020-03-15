const express = require('express');
const app = express();
//const Usuario = require('../models/usuario.model');
const usuario = require('../controllers/usuario.controller');

// Devuelve todos los usuarios
app.get("/usuario", usuario.findAll);

// Devuelve el los datos del usuario con ID= id
app.get("/usuario/:id", usuario.findOne);

// Crea un nuevo usuario
app.post('/usuario', usuario.create);

// Actualizar un usuario con su Id
app.put("/usuario/:id", usuario.update);

// Eliminar el usuario con Id = id
app.delete('/usuario/:id', usuario.delete);

// Elimina TODOS los usuarios
app.delete('/usuario', usuario.deleteAll);

module.exports = app;

// Método	    Url	            Acción
// =======      ===========     ==============================
// GET	        /usuario	    Devuelve TODOS los usuarios
// GET	        /usuario/42	    Devuelve el usuario con id=42
// POST	        /usuario	    Añade nuevo usuario
// PUT	        /usuario/42	    Actualiza el usuario con id=42
// DELETE	    /usuario/42	    Elimina el usuario con id=42
// DELETE	    /usuario	    Elimina TODOS los usuarios