const client = require('knex')({
  client: 'pg',
  connection: `postgres://${process.env.SNIKTAU_DB_USER}@${process.env.SNIKTAU_DB_HOST}:${process.env.SNIKTAU_DB_PORT}/sniktau?connect_timeout=10&application_name=sniktau`,
  searchPath: 'knex,public',
});

export default client;
