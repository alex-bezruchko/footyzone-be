const knex = require('knex');
const setupPaginator = require('knex-paginator');
const environment = process.env.ENVIRONMENT || "development";
const config = require("../knexfile.js")[environment];
setupPaginator(knex);
module.exports = knex(config);
