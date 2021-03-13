const express = require('express');
const app = express();
const port = 3000;
app.get('/', ( _ ,res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen( port, () => {
    console.log('Express listening on port', port);
});

const listen = require('socket.io');
const io = listen(server);

const user = [
    "user 1",
    "user 2",
    "user 3",
    "user 4",
    "user 5",
    "user 6",
]

io.on('connection', (socket) => { 
    const username = user[Math.floor(Math.random()*6)];

    socket.broadcast.emit('join', {username});

    socket.on('client message', (data) => {
        io.emit('server message', {
            username,
            message : data.message
        });
    });

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave', {username});
    })

});