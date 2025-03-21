const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join", (userName) => {
    console.log("Added User : " + userName);
    users.add(userName);
    // Add Username to socket Object
    socket.userName = userName;
    // broadcast all user to join an user
    io.emit("userJoined", userName);

    //send updated list to all clients
    io.emit("userList", Array.from(users));
  });
  socket.on("chatMessage", (message) => {
    // broadcast message to all clients
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Removed User : ", socket.userName);
    if (users.has(socket.userName)) {
      users.delete(socket.userName);

      // broadcast message to all clients
      io.emit("userLeft", socket.userName);

      //send updated list to all clients
      io.emit("userList", Array.from(users));
    }
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
