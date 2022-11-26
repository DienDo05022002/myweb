const app = require('./app')
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
});
console.log('PORT::', process.env.PORT)
const PORT = process.env.PORT || 9000

io.on('connection', (socket) => {
    // console.log(socket.id)

    socket.on('client-message', data => {
      console.log('client-message', data);
      io.emit('sever-message', data);
    });
    socket.on('client-chat', data => {
      console.log('client-chat', data);
      io.emit('sever-chat', data);
    });
    socket.on('disconnect', () => {
        io.emit('user disconnected');
    });
});

// app.listen(PORT, () => {
//     console.log(`Example app listening on port:: http://localhost:${PORT}`)
// })
server.listen(PORT, () => {
    console.log(`Example app listening on port::: http://localhost:${PORT}`)
})