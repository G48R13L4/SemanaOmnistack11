const knex = require('knex');
const configuration = require('../../knexfile');


//developmnet está no arquivo "knexfile.js"
const connection = knex(configuration.development);

module.exports = connection;