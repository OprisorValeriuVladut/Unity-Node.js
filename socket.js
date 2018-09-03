var io = require('socket.io')({
    transports: ['websocket'],
});
io.attach(5001);

var clients = [];

const socketInit = () => {
    io.on('connection', function (socket) {

        var currentUser;

        socket.on('USER_CONNECT', function () {
            console.log('User Connected');
            for(var i=0; i<clients.length;i++){
                socket.emit('USER_CONNECTED', { name: clients[i].name, position:clients[i].position});

                console.log("User name " + clients[i].name + " is connected");
            }
        });

        socket.on("PLAY", function(data){
            currentUser = {
                name: data.name,
                position: data.position
            }
            clients.push(currentUser);
            socket.emit("PLAY", currentUser);
            socket.broadcast.emit("USER_CONNECTED", currentUser);
        });

        socket.on("MOVE", function(data){
            currentUser.position = data.position;
            socket.emit("MOVE", currentUser);
            socket.broadcast.emit("MOVE", currentUser);

            console.log(currentUser.name = "move to " + currentUser.position);
        });

        socket.on("disconnect", function(){
            socket.broadcast.emit("USER_DISCONNECTED", currentUser);
            for(var i=0;i<clients.length;i++){
                if(clients[i].name === currentUser.name){
                    console.log("User " + clients[i].name + " disconnected");
                    clients.splice[i,1];
                }
            }
        });

    });
}

module.exports.socketInit = socketInit;
