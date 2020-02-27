const socket = io('https://chisme-chat.herokuapp.com/');//http://localhost:3000');
const chatContainer = document.getElementById('chat');
const sendButton = document.getElementById('send-message');
const textInput = document.getElementById('type-message');

const name = prompt("What's your name?");
newMessage("You joined!")
socket.emit('new-user', name);

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