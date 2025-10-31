const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected " + socket.id);
  socket.on("chat message", (msg) => {

    const data = {
      id: socket.id,
      msg: msg
    }
    console.log('message: ' + data.msg + ' from ' + data.id);
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected " + socket.id);
  });
});

app.use(express.static(path.join(__dirname, '..')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

httpServer.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
