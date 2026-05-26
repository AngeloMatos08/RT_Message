"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// Define a pasta 'public' para servir arquivos estáticos (como o HTML)
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Gerencia as conexões do Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    // Escuta quando um cliente envia uma mensagem
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        // Transmite a mensagem para TODOS os usuários conectados
        io.emit("chat message", msg);
    });
});
// Rota principal que entrega a página HTML para o navegador
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
