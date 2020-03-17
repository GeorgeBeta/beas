/*
    USE egoHouse;
    CREATE TABLE IF NOT EXISTS rol(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        role VARCHAR(10),
        descripcion  VARCHAR(255)
    );

    USE egoHouse;
    INSERT INTO rol (role, descripcion) VALUES('ADMIN_ROLE', 'Administrador de la aplicación');
    INSERT INTO rol (role, descripcion) VALUES('USER_ROLE', 'Usuario de la aplicación');
*/
const sql = require('./db');

// constructor
const Rol = function(rol) {
    this.id = rol.id;
    this.role = rol.role;
    this.descripcion = rol.descripcion;
}