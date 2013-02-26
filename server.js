var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io');


var locations = fs.readFileSync('./location.json','UTF-8');

var locationsNow = '';

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
	console.log('Listening at: http://localhost:8080');
});


socketio.listen(server).on('connection', function (socket) {
	
	socket.emit('addRouts', locations);
	
	setInterval(function(){
		locationsNow = fs.readFileSync('./location.json','UTF-8');
		
//		console.log('now : '+locationsNow +'== old:'+ locations);
		if( locations != locationsNow ){
			
			locations = locationsNow;
//			
	        console.log('Message Received: ', locations);
	        socket.broadcast.emit('addRouts', locations);
		}
	},300); 

});




