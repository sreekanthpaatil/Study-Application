import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import userRoutes from "./src/routes/user.js";
import postRoutes from "./src/routes/post.js";
import subjectRoutes from "./src/routes/subject.js";
import scheduleRoutes from "./src/routes/schedule.js";
import communityRoutes from "./src/routes/community.js";
import eventRoutes from "./src/routes/event.js";
import bookingRoutes from "./src/routes/booking.js";
import slotRoutes from "./src/routes/slot.js";

import { Server } from "socket.io";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3300;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Database Connected`);
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

const corsConfig = {
  credentials: "true",
  origin: "http://localhost:5173",
  optionSuccessStatus: "200",
};

app.use(compression());
app.use(cors(corsConfig));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/subject", subjectRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/community", communityRoutes);
app.use("/event", eventRoutes);
app.use("/booking", bookingRoutes);
app.use("/slot", slotRoutes);

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.io);

  socket.on("room:join", (data) => {
    const { username, room } = data;
    emailToSocketIdMap.set(username, socket.id);
    socketIdToEmailMap.set(socket.id, username);
    io.to(room).emit("user:joined", { username, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("room:leave", ({ user, socketId }) => {
    console.log(`${user} left the room`);
    emailToSocketIdMap.delete(user);
    socketIdToEmailMap.delete(socketId);
    socket.leaveAll();
    io.emit("user:left", { user });
  });

  socket.on("user:call", ({ to, offer, user }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer, user });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});