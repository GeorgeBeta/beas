const express = require('express');
const app = express();
//const Usuario = require('../models/usuario.model');
const usuario = require('../controllers/usuario.controller');
const { checkToken, checkAdminRole } = require('../middlewares/authorization');

// Devuelve todos los usuarios
app.get("/usuario", checkToken, usuario.findAll);

// Devuelve el los datos del usuario con ID= id
app.get("/usuario/:id", checkToken, usuario.findOne);

// Crea un nuevo usuario
app.post('/usuario', [checkToken, checkAdminRole], usuario.create);

// Actualizar un usuario con su Id
app.put("/usuario/:id", [checkToken, checkAdminRole], usuario.update);

// Eliminar el usuario con Id = id
app.delete('/usuario/:id', [checkToken, checkAdminRole], usuario.delete);

// Elimina TODOS los usuarios
app.delete('/usuario', [checkToken, checkAdminRole], usuario.deleteAll);

// Cambia el password del usuario (requiere permisos ADMIN_ROLE)
app.post('/usuario/changepass/:id', usuario.changePassword);

// Cambia el Rol del usuario con ID= id (Requiere permisos ADMIN_ROLE)
app.post('/usuario/changerole/:id', usuario.changeRole)

module.exports = app;

// Método	    Url	                Acción
// =======      ===========         ==============================
// GET	        /usuario	        Devuelve TODOS los usuarios
// GET	        /usuario/42	        Devuelve el usuario con id=42
// POST	        /usuario	        Añade nuevo usuario
// PUT	        /usuario/42	        Actualiza el usuario con id=42
// DELETE	    /usuario/42	        Elimina el usuario con id=42
// DELETE	    /usuario	        Elimina TODOS los usuarios

// End Points Auxilares:
// =======      ===========                 ==============================
// POST         /usuario/changepass/42      Cambia el password del usuario con id=42
// POST         /usuario/changerole/42      Cambia el rol del usuario con id=42