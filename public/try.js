var username;
var roomId;

var socket = io();



function set_username(){
    username=document.getElementById("username").value;    
    document.getElementById("username_wrapper").innerHTML="Welcome "+username;
    document.getElementById("input_wrapper").innerHTML='<label for="room_data">Enter RoomId:</label>\
    <input type="text" name="room_data" id="room_data" placeholder="Enter RoomId" class="form-control">\
    <br>\
    <button type="button" class="btn btn-default" name="room_data_btn" onclick="set_room()">\
       Submit\
    </button>';
}

function set_room(){
    roomId=document.getElementById("room_data").value;
    document.getElementById("room_data_wrapper").innerHTML="RoomId: "+roomId;
    document.getElementById("input_wrapper").innerHTML='';
}

