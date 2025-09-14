import express from 'express'
const app = express()
import http from 'http'
import { Server } from "socket.io"
import cors from 'cors'

const rooms = {}
function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString()
}

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("send_message", (data) => {
        const { message, from, code } = data;
        if (!rooms[code]) return;
        socket.to(code).emit("rec", { message, from, code });
    })

    socket.on("join-room", ({ code }, cb) => {
        if (!rooms[code]) {
            cb?.({ ok: false, error: "Room not found" })
            return
        }

        if (!rooms[code].members.includes(socket.id)) {
            rooms[code].members.push(socket.id)
        }

        socket.join(code)
        console.log(`Socket ${socket.id} joined room ${code}`)
        console.log(`Room ${code} now has ${rooms[code].members.length} members`)

        cb?.({
            ok: true,
            hostName: rooms[code].hostName,
            roomCode: code,
            memberCount: rooms[code].members.length
        })
    })

    socket.on("create-room", (data, cb) => {
        const code = generateCode()
        rooms[code] = {
            hostId: socket.id,
            members: [socket.id],
            hostName: data.ownerName,
            hostEmail: data.ownerEmail,
            questions: [] // Add questions array to store student responses
        }
        socket.join(code)
        console.log(`Room ${code} created by ${socket.id}`)
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

        console.log(`Starting question stream for room ${userCode}`)
        console.log(`Broadcasting to ${rooms[userCode].members.length} members`)

        // FIXED: Use io.to() to broadcast to ALL room members (including sender)
        io.to(userCode).emit("question-stream:start", { message: "Ask Questions" });
        cb?.({ ok: true });
    });

    socket.on("question-stream:stop", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });

        console.log(`Stopping question stream for room ${userCode}`)
        // FIXED: Use io.to() to broadcast to ALL room members
        io.to(userCode).emit("question-stream:stop", { message: "Question stream ended" });
        cb?.({ ok: true });
    });

    socket.on("reaction-stream:start", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });

        console.log(`Starting reaction stream for room ${userCode}`)
        // FIXED: Use io.to() to broadcast to ALL room members
        io.to(userCode).emit("reaction-stream:start", { message: "Share your reactions" });
        cb?.({ ok: true });
    });

    socket.on("reaction-stream:stop", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });

        console.log(`Stopping reaction stream for room ${userCode}`)
        // FIXED: Use io.to() to broadcast to ALL room members
        io.to(userCode).emit("reaction-stream:stop", { message: "Reactions closed" });
        cb?.({ ok: true });
    });

    socket.on("class:end", ({ userCode }, cb) => {
        if (!rooms[userCode]) return cb?.({ ok: false, error: "Room not found" });

        console.log(`Ending class for room ${userCode}`)
        io.to(userCode).emit("question-stream:stop", { message: "Question stream ended" });
        io.to(userCode).emit("reaction-stream:stop", { message: "Reactions closed" });
        io.to(userCode).emit("class:ended", { message: "Class ended" });

        // Clean up the room
        delete rooms[userCode];
        cb?.({ ok: true });
    });

    // ENHANCED: Handle student responses/questions
    socket.on("student-response", ({ roomCode, response, studentId }) => {
        if (!rooms[roomCode]) {
            console.log(`Room ${roomCode} not found for student response`);
            return;
        }

        console.log(`Student response from ${studentId} in room ${roomCode}: ${response}`);

        // Store the question in the room
        const question = {
            id: Date.now(),
            studentId: studentId,
            response: response,
            timestamp: new Date().toLocaleTimeString()
        };

        if (!rooms[roomCode].questions) {
            rooms[roomCode].questions = [];
        }
        rooms[roomCode].questions.push(question);

        // Send to host only (not all room members)
        socket.to(rooms[roomCode].hostId).emit("student-response", {
            response,
            studentId,
            roomCode,
            timestamp: question.timestamp,
            questionId: question.id
        });

        // Also send to the student who submitted (confirmation)
        socket.emit("response-submitted", {
            message: "Your response has been submitted!",
            timestamp: question.timestamp
        });
    });

    // NEW: Get all questions for host
    socket.on("get-questions", ({ roomCode }, cb) => {
        if (!rooms[roomCode]) {
            return cb?.({ ok: false, error: "Room not found" });
        }

        cb?.({
            ok: true,
            questions: rooms[roomCode].questions || []
        });
    });

    // NEW: Clear all questions
    socket.on("clear-questions", ({ roomCode }, cb) => {
        if (!rooms[roomCode]) {
            return cb?.({ ok: false, error: "Room not found" });
        }

        rooms[roomCode].questions = [];
        cb?.({ ok: true });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);

        Object.keys(rooms).forEach(code => {
            const room = rooms[code];
            room.members = room.members.filter(id => id !== socket.id);

            if (room.hostId === socket.id) {
                console.log(`Host ${socket.id} disconnected from room ${code}, ending class`);
                io.to(code).emit("class:ended", { message: "Host disconnected - Class ended" });
                delete rooms[code];
            }
        });
    });
})

server.listen(3001, () => {
    console.log("Server is running on port 3001")
})

/*
import { sendMail_analytics } from './mail.js' // takes 3 parameters btw

sendMail_analytics("tamed", "tamed", "tamed")
*/