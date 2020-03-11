const io = require('socket.io')(process.env.PORT || 3000);

let users = {};
let room = {};

io.on('connection', socket => {
    //socket.emit('chat-message', 'Hello Bois!!!');

    socket.on('new-user', (userName, roomName) => {
        console.log("yo");
        socket.join(roomName);
        users[socket.id] = userName;
        room[socket.id] = roomName;
        socket.broadcast.in(roomName).emit('user-joined', userName, room);
    });

    socket.on('send-chat-message', message => {
        const msg = {
            user: users[socket.id],
            message: message
        };
        socket.broadcast.in(room[socket.id]).emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
        const userName = users[socket.id];
        socket.broadcast.in(room[socket.id]).emit('user-disconnected', userName);
        delete users[socket.id];
        delete room[socket.id];
    });
});