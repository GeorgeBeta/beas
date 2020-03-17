const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario.model');

// Crea y  Graba un nuevo usuario
exports.create = (req, res) => {
    let body = req.body;

    // Validar la petición
    if (!body.usuario) {
        res.status(400).send({
            message: 'El contenido no puede ser vacío!'
        });
    }

    // Crear un usuario
    const usuario = new Usuario({
        usuario: body.usuario,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        role: body.role,
        estado: body.estado
    });

    // Grabar usuario en la base de datos
    Usuario.create(usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error: Ha ocurrido un error al guardar el usuario."
            });
        else res.send(data);
    });
};

// Devuelve TODOS los uusarios de la base de datos.
exports.findAll = (req, res) => {
    Usuario.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error: Algo ha ocurrido mientras devolvía todos los usuarios."
            });
        else res.send(data);
    });
};

// Encontrar el usuario con el id elegido
exports.findOne = (req, res) => {
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'No encontrado') {
                res.status(404).send({
                    message: `No encontrado usuario con id= ${req.params.usuarioId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error: Algo ha fallado encontrando el usuario id=" + req.params.usuarioId
                });
            }
        } else res.send(data);
    });
};

// Actualizar un usuario identificado con su Id
exports.update = (req, res) => {
    let body = req.body;
    // Validar la petición
    if (!body.usuario) {
        res.status(400).send({
            message: 'El contenido no puede ser vacío!'
        });
    }
    // Crea un usuario con los valores actualizados
    const usuario = new Usuario({
        usuario: body.usuario,
        password: body.password,
        email: body.email,
        role: body.role,
        estado: body.estado
    });
    Usuario.updateById(
        req.params.id,
        // new Usuario(req.body),
        usuario,
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: `Uusaario no encontrado con id = ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error: Actualizando usuario con id = " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Elimina el usuario con un 'id' especificado en la solicitud
exports.delete = (req, res) => {
    Usuario.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                res.status(404).send({
                    message: `No encontrado usuario con id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se ha podido eliminar el usuario con el id = " + req.params.id
                });
            }
        } else res.send({ message: `El usuario ha sido eliminado con éxito!` });
    });
};

// Elimina TODOS los usuarios de la base de datos
exports.deleteAll = (req, res) => {
    Usuario.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algún error ha ocurrido eliminando todos los usuarios."
            });
        else res.send({ message: `Todos los usuarios fuero eliminados con éxito!` });
    });
};