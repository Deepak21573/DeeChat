const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const socket = require('socket.io');
require("dotenv").config();

const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messagesRoute.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log("Database connection error:", err.message);
    });

// Starting the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});

// Socket.IO setup
const io = socket(server, {
    cors: {
        origin: process.env.ORIGIN,
        credentials: true,
    },
});

// Online users map
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        console.log(`User added to Socket ${socket.id}`);
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    });
});
