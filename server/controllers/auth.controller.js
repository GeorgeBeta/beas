const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
//const Rol = require('../models/role.model')

// Logea un usuario existente
exports.signinEmailOrUsuario = (req, res) => {
    let body = req.body;
    // let token;
    if (body.email) {
        Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
            if (err) {
                if (err.kind === 'No encontrado') {
                    return res.status(404).json({
                        ok: false,
                        message: `No encontrado usuario con email= ${body.email}.`
                    });
                } else {
                    return res.status(500).json({
                        ok: false,
                        message: "Error: Algo ha fallado encontrando el email =" + body.email
                    });
                }
            } else {
                if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                    console.log('No cumple el password (email)');
                    return res.status(400).json({
                        ok: false,
                        message: 'Contraseña incorrecta'
                    })
                }
                // Generación del Token
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: Number(process.env.EXPIRATION_TOKEN) });
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token
                })
            }
        });
    } else {
        Usuario.findOne({ usuario: body.usuario }, (err, usuarioDB) => {
            if (err) {
                if (err.kind === 'No encontrado') {
                    return res.status(404).json({
                        ok: false,
                        message: `No encontrado usuario con usuario= ${body.usuario}.`
                    });
                } else {
                    return res.status(500).send({
                        ok: false,
                        message: 'Error: Algo ha fallado encontrando el usuario =' + body.email
                    });
                }
            } else {
                if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                    console.log('No cumple el password (usuario)');
                    return res.status(400).json({
                        ok: false,
                        message: 'Contraseña incorrecta'
                    })
                }
                // Generación del Token
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: Number(process.env.EXPIRATION_TOKEN) });
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token
                })
            }
        });
    }
};

// Registra un usuario nuevo
exports.signup = (req, res) => {
    let body = req.body;

    console.log('TODO OK');
    let token = 'las vacas del pueblo ya se han escapao ...';
    // let token = jwt.sign({
    //     usuario: usuarioDB
    // }, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });
    return res.json({
        ok: true,
        usuario: usuarioDB,
        token: token
    })
};