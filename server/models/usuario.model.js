/*
    USE egoHouse;
    CREATE TABLE IF NOT EXISTS usuario(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        usuario VARCHAR(30), 
        password VARCHAR(255), 
        email VARCHAR(255), 
        role VARCHAR(10), 
        estado BOOLEAN DEFAULT true, 
        fechaAlta DATETIME
    );
*/
const sql = require('./db');

// constructor
const Usuario = function(usuario) {
    this.id = usuario.id;
    this.usuario = usuario.usuario;
    this.password = usuario.password;
    this.email = usuario.email;
    this.role = usuario.role;
    this.estado = true;
    //this.fechaAlta = usuario.fechaAlta;
};

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Usuario creado: ", { id: res.insertId });
        result(null, { id: res.insertId });
    });
};

Usuario.findById = (usuarioId, result) => {
    sql.query(`SELECT * FROM usuario WHERE id = ${usuarioId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Usuario encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // No encontrado el usuario con el id
        result({ kind: "Usuario No Encontrado" }, null);
    });
};

Usuario.getAll = result => {
    sql.query("SELECT * FROM usuario", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Usuarios: ", res);
        result(null, res);
    });
};

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        "UPDATE usuario SET usuario = ?, password = ?, email = ?, role = ?, estado = ? WHERE id = ?", [usuario.usuario, usuario.password, usuario.email, usuario.role, usuario.estado, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "No encontrado" }, null);
                return;
            }

            console.log("Usuario actualizado: ", { id: id });
            result(null, { id: id });
            // console.log("Usuario actualizado: ", { id: id, ...usuario });
            // result(null, { id: id, ...usuario });
        }
    );
};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuario WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "No encontrado" }, null);
            return;
        }

        console.log("Borrado usuario con id: ", id);
        result(null, res);
    });
};

Usuario.removeAll = result => {
    sql.query("DELETE FROM usuario", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`borrados ${res.affectedRows} usuarios`);
        result(null, res);
    });
};

module.exports = Usuario;