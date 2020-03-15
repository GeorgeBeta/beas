const activeEnv = process.env.NODE_ENV || "development"
require("dotenv").config({
    path: `.env.${activeEnv}`
})