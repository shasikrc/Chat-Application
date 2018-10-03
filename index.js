const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nickNames = [];

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('join', (data) => {
        console.log(data.user + ' joined');

        socket.nickname = data.user;
        nickNames.push(socket.nickname);
        console.log('nick names :' + nickNames);
        io.emit('usernames', nickNames);

        io.emit('new User Joined'
            , { user: data.user, message: ' has joined this room.', isSpecial: true });
    });


    socket.on('message', (data) => {
        io.emit('newMessage', { user: data.user, message: data.message, isSpecial: false });
    });


    socket.on('disconnect', function () {
        console.log('user disconnected from the chat');
        nickNames.splice(nickNames.indexOf(socket.nickname), 1);
        io.emit('usernames', nickNames);
        socket.broadcast.emit('User Leaved'
            , { user: socket.nickname, message: ' has leaved this room.', isSpecial: true });
    });
});

// server bootstrap
http.listen(3000, () => {
    console.log('listening on *:3000');
});