var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var io       = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })(http);

app.use(express.static(__dirname + '/release'));

io.on('connection', function(socket) {
	var id = socket.id;
	console.log('connect '+id);
	socket.emit('connected',id);

	socket.on('move', function(data) {	
	//console.log('move '+data.position);
		var currentUser = {
			id:id,
			position:data.position
		}
	socket.broadcast.emit('move', currentUser);

	});

	socket.on('rotate', function(data) {		
	//console.log('rotate '+data.position);
		var currentUser = {
			id:id,
			position:data.position
		}
		socket.broadcast.emit('rotate', currentUser);
	});
	
	socket.on('rotateGun', function(data) {		
	//console.log('rotateGun '+data.position);
		var currentUser = {
			id:id,
			position:data.position
		}
		socket.broadcast.emit('rotateGun', currentUser);
	});
	
	socket.on('takeDamage', function(data) {
		var currentUser = {
			id:id,
			damage:data.damage,
			enemy_id:data.enemy_id
		}
		socket.broadcast.emit('takeDamage', currentUser);
	});

	socket.on('talk', function(message) {
		var currentUser = {
			id:id,
			message:message
		}
		socket.broadcast.emit('talk',currentUser);
	});
	
	socket.on('changeNick', function(message) {
		var currentUser = {
			id:id,
			message:message
		}
		socket.broadcast.emit('changeNick',currentUser);
	});

	socket.on('shoot', function() {		
		//console.log('shoot');
		socket.broadcast.emit('shoot', id);
	});

	socket.on('disconnect', function(message) {		
		console.log('disconnect '+id);
		socket.broadcast.emit('destroy', id);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
