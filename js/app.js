const socket = io('http://localhost:3000');
const chatContainer = document.getElementById('chat');
const sendButton = document.getElementById('send-message');
const textInput = document.getElementById('type-message');
const exit = document.getElementById('exit');

var name, room;

function initialize(){
    name = prompt("What's your name?");
    room = prompt("Which room you want to join?");

    document.getElementById('room').innerText = room;

    newMessage(`You joined ${room}!`);
    socket.emit('new-user', name, room);
}

initialize();

socket.on('user-joined', userName => {
    newMessage(`${userName} joined!`);
});

socket.on('user-disconnected', userName => {
    newMessage(`${userName} disconnected!`);
});

socket.on('chat-message', message => {
    msg = `${message.user} : ${message.message}`;
    newMessage(msg);
});

sendButton.addEventListener('click', e => {
    const text = textInput.value;
    newMessage(`You : ${text}`);
    socket.emit('send-chat-message', text)
    textInput.value = '';
})

function newMessage(message){
    const messageElement = document.createElement('p');
    messageElement.innerHTML = message;
    chatContainer.append(messageElement);
}

exit.addEventListener('click', e => {
    // console.log("yo");
    // socket.disconnect();
    // initialize();
    location.reload();
});