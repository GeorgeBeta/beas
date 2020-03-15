const mysql = require('mysql');
require('../config/config');

// Crear una conexión a la Base de datos
const connection = mysql.createPool({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE
});

console.log('Base de Datos Conectada.');

module.exports = connection;