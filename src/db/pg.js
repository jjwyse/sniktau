import properties from 'properties';

const client = require('knex')({
  client: 'pg',
  connection: properties.dbConnectionString,
  searchPath: 'knex,public',
});

export default client;
