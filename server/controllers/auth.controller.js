const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario.model');
//const Rol = require('../models/role.model')

// Logea un usuario existente
exports.signin = (req, res) => {
    let body = req.body;
    console.log('Pasa por aquí');
    Usuario.findByEmail(body.email, (err, usuarioDB) => {
        if (err) {
            if (err.kind === 'No encontrado') {
                res.status(404).send({
                    message: `No encontrado usuario con email= ${body.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error: Algo ha fallado encontrando el usuario id=" + body.email
                });
            }
        } else res.send(usuarioDB);
        // if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
        //     return res.status(400).json({
        //         ok: false,
        //         mensaje: 'Usuario o (contraseña) incorrectos'
        //     })
        // }
        //         let token = jwt.sign({
        //             usuario: usuarioDB
        //         }, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });
        // res.json({
        //     ok: true,
        //     usuario: usuarioDB,
        //     token: token
        // })
    });
};
// app.post('/login', (req, res) => {
//     let body = req.body;
//     Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: '(Usuario) o contraseña incorrectos'
//             })
//         }
//         if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'Usuario o (contraseña) incorrectos'
//             })
//         }
//         let token = jwt.sign({
//             usuario: usuarioDB
//         }, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });
//         res.json({
//             ok: true,
//             usuario: usuarioDB,
//             token: token
//         })
//     })
// })