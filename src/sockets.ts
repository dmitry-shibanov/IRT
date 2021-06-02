import socketIO from "socket.io";
import { Server } from "http";
import initServer from "./initSockets";
let io: socketIO.Server;

const initServer = (httpServer: Server) => {
  io = new socketIO.Server(httpServer);
  return io;
};

const initServerObj: initServer = {
  init: initServer,
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }

    return io;
  },
};

export default initServerObj;
