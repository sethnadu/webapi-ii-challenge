const express = require('express');

const server = express();
const postRouter = require('./Posts/posts-router.js');

server.use(express.json());

server.use('/api/posts', postRouter);


const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
});