import express from 'express'
const app = express()
import http from 'http'
import { Server } from "socket.io"
import cors from 'cors'

const rooms = {}
function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString()
}

const server = http.createServer(app)  // let express handle it


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }

})

io.on("connection", (socket) => {

    console.log(`User connected ${socket.id}`) // very unique 


    socket.on("send_message", (data) => {
        if (!rooms[code]) return;
        socket.to(code).emit("rec", { message, from, code });
    })
    socket.on("join-room", ({ code }, cb) => {
        if (!rooms[code]) {
            cb?.({ ok: false, error: "Room not found" })
            return
        }
        rooms[code].members.push(socket.id)
        socket.join(code)
        cb?.({ ok: true })
    })

    socket.on("create-room", (data, cb) => {
        const code = generateCode()
        rooms[code] =
        {
            hostId: socket.id,
            members: [socket.id],
            hostName: data.ownerName,
            hostEmail: data.ownerEmail


        }
        socket.join(code)
        cb?.({
            ok: true,
            code,
            hostId: socket.id,
            hostName: rooms[code].hostName,
            hostEmail: rooms[code].hostEmail
        })
    })
    socket.on("question-stream:start", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });
        io.to(userCode).emit("question-stream:start", { message: "Ask Questions" });
        cb?.({ ok: true });
    });

    socket.on("question-stream:stop", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });
        io.to(userCode).emit("question-stream:stop", { message: "Question stream ended" });
        cb?.({ ok: true });
    });

    socket.on("reaction-stream:start", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });
        io.to(userCode).emit("reaction-stream:start", { message: "Reactions open" });
        cb?.({ ok: true });
    });

    socket.on("reaction-stream:stop", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });
        io.to(userCode).emit("reaction-stream:stop", { message: "Reactions closed" });
        cb?.({ ok: true });
    });

    socket.on("class:end", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });
        io.to(userCode).emit("question-stream:stop", { message: "Question stream ended" });
        io.to(userCode).emit("reaction-stream:stop", { message: "Reactions closed" });
        io.to(userCode).emit("class:ended", { message: "Class ended" });
        cb?.({ ok: true });
    });


    socket.on("end-class", (data, cb) => {



    })


})

server.listen(3001, () => {
    console.log("Server is running")
})

/*
import { sendMail_analytics } from './mail.js' // takes 3 parameters btw

sendMail_analytics("tamed", "tamed", "tamed")
*/