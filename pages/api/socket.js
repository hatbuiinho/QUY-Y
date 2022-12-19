import { Server } from 'socket.io'

let admin_id = null;
const SocketHandler = (req, res) => {
	if (res.socket.server.io) {
		console.log('Socket is already running')
	} else {
		console.log('Socket is initializing')
		const io = new Server(res.socket.server)
		res.socket.server.io = io
		io.on('connection', socket => {
			socket.on('set-admin', msg => {
				admin_id = socket.id;
				console.log("admin_id", admin_id)
			})
			socket.on('input-change', msg => {
				if (typeof msg === 'object' && msg.user && msg.user == "admin")
					socket.broadcast.emit('update-input', msg.value)
			})
			socket.on('submit-answer', msg => {
				console.log("admin_id", admin_id);
				console.log(msg);
				if (admin_id) io.to(admin_id).emit('update-answer', msg);
			})
			socket.on('disconnect', function(){
				if (socket.id == admin_id) admin_id = null;
			});		  
		})
	}
	res.end()
}

export default SocketHandler
