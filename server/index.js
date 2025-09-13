import express from 'express'
const app = express();
import http from 'http'
import { Server } from 'socket-io'
import cors from 'cors'


app.use(cors()) // so its just allows any connection from the time being

const server = http.createServer(app)

const io = new Server(server, {


})

io.on("connection", (socket) => {

    console.log(`User connected ${socket.id}`)

    socket.on("send_message", (data) => { // listening for client
        socket.broadcast.emit("rec", data) // sending to all
    })

})

server.listen(3001, () => console.log("Server running on 3001"))





/*
import { sendMail_analytics } from './mail.js' // takes 3 parameters btw

sendMail_analytics("tamed", "tamed", "tamed")
*/