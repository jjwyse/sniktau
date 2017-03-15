import config from 'config';

console.log(config);

const client = require('knex')({
  client: 'pg',
  connection: config.dbConnectionString,
  searchPath: 'knex,public',
});

export default client;
