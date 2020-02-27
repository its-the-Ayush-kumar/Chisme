const io = require('socket.io')(process.env.PORT || 3000);

let users = {}

io.on('connection', socket => {
    //socket.emit('chat-message', 'Hello Bois!!!');

    socket.on('new-user', userName => {
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send-chat-message', message => {
        const msg = {
            user: users[socket.id],
            message: message
        };
        socket.broadcast.emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
        const userName = users[socket.id];
        socket.broadcast.emit('user-disconnected', userName);
        delete users[socket.id];
    });
});