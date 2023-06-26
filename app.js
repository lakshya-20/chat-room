var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   res.sendFile('try.html');
})

const port = process.env.PORT || 5000;
var server = app.listen(port, () => {
   console.log("Server running on port " + port);
});
var io = require('socket.io')(server);

const users = [];


io.on('connection', function (socket) {
   console.log("New Connection");

   socket.on('connectToRoom', function (data) {
      const user = data.user;
      const roomId = data.roomId;
      socket.join(roomId);
      socket.emit('connectedToRoom', "You are in room: " + roomId);
      io.sockets.in(roomId).emit('newMessage', { message: `${user} joined the chat`, user: "ChatBot" });
      console.log('A user connected in room: ' + roomId);
   })

   socket.on('setUsername', function (data) {
      const user = data.user;
      if (users.indexOf(user) > -1) {
         socket.emit('userExists', user + ' username is taken! Try some other username.');
      } else {
         users.push(user);
         socket.emit('userSet', { user });
      }
   });

   socket.on('message', function (data) {
      io.sockets.in(roomId).emit('newMessage', data);
   })

   socket.on('leave', function (data) {
      const user = data.user;
      const roomId = data.roomId;
      socket.leave(roomId);
      console.log(`${user} left the room: ${roomId}`);
      io.sockets.in(roomId).emit('newMessage', { message: `${user} left the chat`, user: "ChatBot" });
   })
});
