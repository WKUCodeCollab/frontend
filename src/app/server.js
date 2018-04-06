//Chat code altered from: https://tutorialedge.net/typescript/angular/angular-socket-io-tutorial/

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// starting text for the code editor
var body = "public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello, World\");\n\t}\n}";

io.sockets.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // send signal to refresh editor to client
	socket.emit('refreshEditor', {body: body});

	// update body when refreshEditor is recieved
	socket.on('refreshEditor', function (body_) {
		console.log('new body: ' + body_);
        body = body_;
	});

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});    
    });

    // Receive editorChange signal and obj with changes, re-emit to all except sender
    socket.on('editorChange', (changesObj) => {
        console.log("changes recieved: " + changesObj);
        if (changesObj.origin == '+input' || changesObj.origin == 'paste' || changesObj.origin == '+delete'){
            socket.broadcast.emit('editorChange', changesObj);
        }
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('started on port 5000');
});