const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = 3000;

app.use(express.static(__dirname + "/public"));

http.listen(PORT , ()=>{
    console.log(`at port ${PORT}`)
})

app.get("/" , (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

const io = require('socket.io')(http);

io.on('connection' , (socket)=>{
    console.log("connected...");

    socket.on('message' , (msg)=>{
        socket.broadcast.emit('message' , msg);
    })
})