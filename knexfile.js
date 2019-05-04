module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/blog.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    // connection: 
    //   'postgres://grtxagaeepkutv:65e1cdd69d71e9b05d0369feec8f0952ae2605d46ecc6924b8c0e02e166fb83e@ec2-75-101-131-79.compute-1.amazonaws.com:5432/d1miilfsg43jp3',
      // host: 'ec2-75-101-131-79.compute-1.amazonaws.com',
      // database: 'd1miilfsg43jp3',
      // user:     'grtxagaeepkutv',
      // password: '65e1cdd69d71e9b05d0369feec8f0952ae2605d46ecc6924b8c0e02e166fb83e'
    // },
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/data/migrations',
    },
    seeds: {
        directory: __dirname + '/data/seeds/',
    },
},
};
