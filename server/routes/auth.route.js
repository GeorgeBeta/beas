const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');
const auth = require('../controllers/auth.controller');
//const jwt = require('jsonwebtoken');

const app = express();

// Logea un usuario existente
app.post("/login", auth.signin);

module.exports = app;