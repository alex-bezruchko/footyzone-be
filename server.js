const express = require('express');
const cors = require('cors');
const server = express();
const logger = require('morgan');
const path = require('path');

const helmet = require('helmet');

server.use(express.json(), logger('dev'), cors(), helmet(), );
server.use('/static', express.static(path.join(__dirname, 'uploads')))

const postRoutes = require('./posts/postRoutes');
const userRoutes = require('./users/userRoutes');
const authRoutes = require('./auth/authRouter');

server.get('/', (req, res) => {
    res.status(200).json('Home Page up and running')
});

server.use('/api/posts/', postRoutes);
server.use('/api/users/', userRoutes);
server.use('/auth/', authRoutes);


module.exports = server;