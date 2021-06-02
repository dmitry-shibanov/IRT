import { Server } from "http";
import SocketIO from "socket.io";

type initServerType = {
  init: (httpServer: Server) => SocketIO.Server;
  getIO: () => SocketIO.Server;
};

export default initServerType;
