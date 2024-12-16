const {Server}= require("socket.io")
const express = require("express")
const {createServer} = require("http")
const path = require("path")
const { log } = require("console")

const app = express()
const server = createServer(app)
const io = new Server(server, {})

app.use("/clsocket", express.static(path.join(__dirname, "clientsocket.html")))

io.on("connection", (socket)=>{
    log("server handshake established!")
    socket.on("chat ka message", (msg)=>{
        log("the message sent from client "+ socket.id+" is "+ '"'+msg +'"')

    io.emit("chat ka message", msg)
    })
    //handling disconnect
    socket.on("disconnect", (socket)=>{
        log("client "+"'"+socket.id+"'"+" disconneted")
    })
    console.log("id from server side", socket.id);

})

server.listen(6969, ()=>{
    log('alive at port 6969')
})