const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario.model');

// Crea y  Graba un nuevo usuario
exports.create = (req, res) => {
    let body = req.body;

    // Validar la petición
    if (!body.usuario) {
        return res.status(400).json({
            ok: false,
            message: 'El contenido no puede ser vacío!'
        });
    }

    // Crear un usuario
    const usuario = new Usuario({
        usuario: body.usuario,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        role: body.role,
        estado: body.estado,
        fechaAlta: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    // Grabar usuario en la base de datos
    Usuario.create(usuario, (err, data) => {
        if (err)
            return res.status(500).json({
                ok: false,
                message: err.message || "Error: Ha ocurrido un error al guardar el usuario."
            });
        else return res.json({
            ok: true,
            usuario: data
        });
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
                    message: `No encontrado usuario con id= ${req.params.id}.`
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "Error: Algo ha fallado encontrando el usuario id=" + req.params.id
                });
            }
        } else return res.json({
            ok: true,
            usuario: data
        });
    });
};

// Actualizar un usuario identificado con su Id
exports.update = (req, res) => {
    let body = req.body;

    const usuario = new Usuario({});
    // Recupera los valores del usuario ANTES del cambio
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'No encontrado') {
                return res.status(404).json({
                    ok: false,
                    message: `No encontrado usuario con id= ${req.params.id}.`
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "Error: Algo ha fallado encontrando el usuario id=" + req.params.id
                });
            }
        }

        // Crea un usuario con los valores actualizados
        usuario.id = body.id || data.id;
        usuario.usuario = body.usuario || data.usuario;
        usuario.password = data.password;
        usuario.email = body.email || data.email;
        usuario.role = body.role || data.role;
        usuario.estado = body.estado || data.estado;
        usuario.fechaAlta = body.fechaAlta || data.fechaAlta;

        Usuario.updateById(
            req.params.id,
            usuario,
            (err, data) => {
                if (err) {
                    if (err.kind === "No encontrado") {
                        return res.status(404).json({
                            ok: false,
                            message: `Usuario no encontrado con id = ${req.params.id}.`
                        });
                    } else {
                        return res.status(500).json({
                            ok: false,
                            message: "Error: Actualizando usuario con id = " + req.params.id
                        });
                    }
                }
            }
        );
        return res.json({
            ok: true,
            usuario: usuario
        });
    });
};

// Elimina el usuario con un 'id' especificado en la solicitud
exports.delete = (req, res) => {
    Usuario.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                return res.status(404).json({
                    ok: false,
                    message: `No encontrado usuario con id = ${req.params.id}.`
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "No se ha podido eliminar el usuario con el id = " + req.params.id
                });
            }
        } else return res.json({
            ok: true,
            message: `El usuario ha sido eliminado con éxito!`
        });
    });
};

// Elimina TODOS los usuarios de la base de datos
exports.deleteAll = (req, res) => {
    Usuario.removeAll((err, data) => {
        if (err)
            return res.status(500).json({
                ok: false,
                message: err.message || "Algún error ha ocurrido eliminando todos los usuarios."
            });
        else return res.json({
            ok: true,
            message: `Todos los usuarios fuero eliminados con éxito!`
        });
    });
};

// Cambia el password del usuario con el id especificado
exports.changePassword = (req, res) => {
    // En el body tan solo hay dos parámetros:
    // password - Password del usuario haste éste momento
    // newpassw - Nuevo password del usuario
    let body = req.body;

    const usuario = new Usuario({});
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'No encontrado') {
                res.status(404).send({
                    message: `No encontrado usuario con id= ${req.params.id}.`
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "Error: Algo ha fallado encontrando el usuario id=" + req.params.id
                });
            }
        }
        // Si el usuario existe en la BBDD --> Comprobar que el password antíguo 
        // que de momento es el que todavía rige es correcto
        // 
        if (!bcrypt.compareSync(body.password, data.password)) {
            console.log('No cumple el password (email)');
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta'
            })
        }

        // Crea un usuario con los valores actualizados
        usuario.id = data.id;
        usuario.usuario = data.usuario;
        usuario.password = bcrypt.hashSync(body.newpassw, 10) || data.password;
        usuario.email = data.email;
        usuario.role = data.role;
        usuario.estado = data.estado;
        usuario.fechaAlta = data.fechaAlta;

        Usuario.updateById(
            req.params.id,
            usuario,
            (err, data) => {
                if (err) {
                    if (err.kind === "No encontrado") {
                        return res.status(404).json({
                            ok: false,
                            message: `Usuario no encontrado con id = ${req.params.id}.`
                        });
                    } else {
                        return res.status(500).json({
                            ok: false,
                            message: "Error: Actualizando usuario con id = " + req.params.id
                        });
                    }
                }
            }
        );
        return res.json({
            ok: true,
            message: `Password del usuario con id = ${req.params.id} ha sido cambiado con éxito`
        })

        // return res.json({
        //     ok: true,
        //     usuario: usuario
        // });


        // else {

        //     return res.send(`El password del usuario con id = ${req.params.id} ha sido cambiado con éxito`);
        // }
    });
};

// Cambia el rol del usuario con el id especificado
exports.changeRole = (req, res) => {
    // En el body tan sólo hay un parámetro
    // newrole  - Nuevo role del usuario
    let body = req.body;

    const usuario = new Usuario({});
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'No encontrado') {
                res.status(404).send({
                    message: `No encontrado usuario con id= ${req.params.id}.`
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    message: "Error: Algo ha fallado encontrando el usuario id=" + req.params.id
                });
            }
        }

        // Comprobar si el role nuevo que se propone no es igual que el antíguo 
        // 
        if (body.newrole === data.role) {
            return res.status(400).json({
                ok: false,
                message: 'El rol propuesto es el mismo que yq tenía el usuario'
            })
        }

        // Crea un usuario con los valores actualizados
        usuario.id = data.id;
        usuario.usuario = data.usuario;
        usuario.password = data.password;
        usuario.email = data.email;
        usuario.role = body.newrole || data.role;
        usuario.estado = data.estado;
        usuario.fechaAlta = data.fechaAlta;

        Usuario.updateById(
            req.params.id,
            usuario,
            (err, data) => {
                if (err) {
                    if (err.kind === "No encontrado") {
                        return res.status(404).json({
                            ok: false,
                            message: `Usuario no encontrado con id = ${req.params.id}.`
                        });
                    } else {
                        return res.status(500).json({
                            ok: false,
                            message: "Error: Actualizando usuario con id = " + req.params.id
                        });
                    }
                }
            }
        );
        return res.json({
            ok: true,
            message: `El rol del usuario con id = ${req.params.id} ha sido cambiado con éxito`
        })

        // return res.json({
        //     ok: true,
        //     usuario: usuario
        // });
    });
};