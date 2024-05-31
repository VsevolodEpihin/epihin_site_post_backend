module.exports = {
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
