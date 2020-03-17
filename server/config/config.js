//
// Faltan incorporar en GitHub los ficheros que preservan la exposición de los 
// parámetros esenciales de la aplicación. 
//
//  Datos que se definen:
//      PUERTO DE LA APLICACIÓN:
//      =========================
//      PORT = 3000
//      
//      PARÁMETROS DE CONEXIÓN A LA BASE DE DATOS:
//      ===========================================
//      RDS_HOSTNAME = zaporlentz.cks454fz2vcw.eu-west-1.rds.amazonaws.com
//      RDS_USERNAME = admin
//      RDS_PASSWORD = Carla470998
//      RDS_DATABASE = egoHouse
//      RDS_PORT = 3306
//
// Ficheros [Situados en el dir. raíz y excluidos del repositorio GitHub con .gitignore]:
//  .env.development
//  .env.production

const activeEnv = process.env.NODE_ENV || "development"
require("dotenv").config({
    path: `.env.${activeEnv}`
})