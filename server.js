var http = require('http'),  
io = require('socket.io'),
fs = require('fs'),
serialport = require("serialport"),
SerialPort = serialport.SerialPort,
tty = new SerialPort("/dev/ttyACM0", {parser: serialport.parsers.readline("\n")}),
sdata,
dataflag,
index;

fs.readFile('./client.html', function (err, data) {
	if (err) {
		
		throw err;
	}
	index = data;
});

server = http.createServer(function(req, res){ 
	// your normal server code 
	dataflag = 0;
	res.writeHead(200, {'Content-Type': 'text/html'}); 
	res.end(index); 
});

tty.on("data", function (data) {
	if(friend != undefined) {
		friend.volatile.emit('message', data);
	}
});


server.listen(8000);


// socket.io
io = io.listen(server);

var friend;

io.sockets.on('connection', function (socket) {
	socket.volatile.emit('message', sdata);
	friend = socket;

	socket.on('disconnect', function () {
	
	});
}); 
