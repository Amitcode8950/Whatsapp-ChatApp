import express from "express";
import http from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import userRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import User from "./models/auth.models.js";
import Message from "./models/message.models.js";

// dns
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

// Global error handler — catches unhandled errors from Express routes
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    credentials: true,
  },
});

const onlineUsers = new Map(); // userId -> socketId

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Authentication required"));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.userId;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  onlineUsers.set(socket.userId, socket.id);
  console.log(`User connected: ${socket.userId}`);

  // Broadcast online status to all other connected clients
  socket.broadcast.emit("user-online", { userId: socket.userId });

  // Tell this client who is currently online
  socket.emit("online-users", Array.from(onlineUsers.keys()));

  socket.on("send-message", async (message) => {
    try {
      const savedMessage = await Message.create({
        from: message.from,
        to: message.to,
        text: message.text,
      });

      const receiverSocketId = onlineUsers.get(message.to);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message-received", savedMessage);
      }
    } catch (error) {
      console.error("Failed to save message:", error);
      socket.emit("message-error", { error: "Failed to save message" });
    }
  });

  socket.on("call-user", async ({ to, offer }) => {
    const receiverSocketId = onlineUsers.get(to);
    if (receiverSocketId) {
      try {
        const caller = await User.findById(socket.userId).select("name email");
        io.to(receiverSocketId).emit("call-made", {
          from: socket.userId,
          offer,
          caller,
        });
      } catch (error) {
        console.error("Failed to initiate call:", error);
      }
    }
  });

  socket.on("accept-call", ({ to, answer }) => {
    const receiverSocketId = onlineUsers.get(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-accepted", {
        answer,
        callee: socket.userId,
      });
    }
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    const receiverSocketId = onlineUsers.get(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("ice-candidate", {
        from: socket.userId,
        candidate,
      });
    }
  });

  socket.on("end-call", ({ to }) => {
    const receiverSocketId = onlineUsers.get(to);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-ended");
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.userId);
    console.log(`User disconnected: ${socket.userId}`);
    // Broadcast offline status to all other connected clients
    socket.broadcast.emit("user-offline", { userId: socket.userId });
  });

  socket.on("error", (error) => {
    console.error(`Socket error for user ${socket.userId}:`, error.message);
  });
});

// Connect to MongoDB first, then start the server
async function startServer() {
  try {
    await mongoose.connect(process.env.mongodbURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4
    });
    console.log("MongoDB connected");

    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit cleanly if DB fails
  }
}

startServer();
