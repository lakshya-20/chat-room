var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

const port=process.env.PORT || 5001;
var server = app.listen( port ,()=>{
    console.log("Server running on port "+port);
});
var io = require('socket.io')(server);

users = [];
// var namespace='';

// var nsp=io.of('/');
// app.get('/namespace',(req,res)=>{
//     console.log("Entered");
//     namespace=req.body.namespace;
//     nsp=io.of('/one');
//     res.status(200).send("OK");
// })




io.on('connection', function(socket) {   
   var roomId='';
   socket.on('connectToRoom',function(data){
       roomId=data;
       //console.log("RoomId "+roomId);
       socket.join("room-"+roomId);
       io.sockets.in("room-"+roomId).emit('connectedToRoom', "You are in room no. "+roomId);       
       console.log('A user connected in room: '+"room"+roomId);
   })

   socket.on('setUsername', function(data) {
      //console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      console.log("New Message");
      io.sockets.in("room-"+roomId).emit('newmsg', data);
   })
});
