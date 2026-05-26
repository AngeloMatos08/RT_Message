import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Define a pasta 'public' para servir arquivos estáticos (como o HTML)
app.use(express.static(path.join(__dirname, "../public")));

// Gerencia as conexões do Socket.IO
io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Escuta quando um cliente envia uma mensagem
  socket.on("chat message", (msg: string) => {
    console.log("message: " + msg);
    // Transmite a mensagem para TODOS os usuários conectados
    io.emit("chat message", msg);
  });
});

// Rota principal que entrega a página HTML para o navegador
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});