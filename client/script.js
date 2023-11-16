const socket = new WebSocket('ws://localhost:8080');

const sendBtn = document.getElementById('send');
const usernameInput = document.getElementById('username');
const msgInput = document.getElementById('message');
const messageWindow = document.getElementById('messages');
const statusSpan = document.getElementById('status');

socket.addEventListener('open', ()=>{
  statusSpan.textContent= 'Online';
  console.log('open');
});

socket.addEventListener('close', ()=>{
  statusSpan.textContent= 'Offline';
  console.log('close');
});

socket.addEventListener('message', event=>{ console.log(JSON.parse(event.data));
  const { username, msg } = JSON.parse(event.data);
  const messageDiv = document.createElement('li');
  messageDiv.textContent= `${username}: ${msg}`;
  messageWindow.appendChild(messageDiv);
});

sendBtn.addEventListener('click',()=>{
  socket.send(JSON.stringify({username:usernameInput.value, msg:msgInput.value}));
});
// const url = 'ws://localhost:6942/myWebsocket';
// const mywsServer = new WebSocket(url);
//
// const myMessages = document.getElementById('messages');
// const myInput = document.getElementById('message');
// const sendBtn = document.getElementById('send');
//
// sendBtn.disabled  = true;
// sendBtn.addEventListener('click', sendMsg, false);
//
// function sendMsg(){
//   const text = myInput.value;
//   msgGeneration(text, 'Client');
//   mywsServer.send(text);
// }
//
// function msgGeneration(msg, from){
//   const newMessage = document.createElement('h5');
//   newMessage.innerText = `${from}: ${msg}`;
//   myMessages.appendChild(newMessage);
// }
//
// mywsServer.onopen = function(){
//   sendBtn.disabled = false;
// }
//
// mywsServer.onmessage = function(event){
//   const { data } = event;
//   msgGeneration(data, 'Server');
// }
