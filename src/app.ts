import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import { json, urlencoded } from "body-parser";
import secretaryRoutes from "./routes/secretary";
import db from "./keys/db.json";
import studentRoutes from "./routes/student";
import auth from "./routes/auth";
import HttpRequestError from "./models/HttpRequestError";
import initServer from "./sockets";
const app = express();

app.use(json());
// app.use("/assets/images", express.static(path.join(__dirname.replace("/dist",""), "assets/images")));
app.use(urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, Accept"
  );

  next();
});

app.use("/auth", auth);
app.use("/secretary", secretaryRoutes);
app.use("/student", studentRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "page not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  const errHttpRequest = err as HttpRequestError;

  if (errHttpRequest["statusCode"]) {
    statusCode = errHttpRequest.statusCode();
  }

  return res.status(statusCode).json({ message: err.message });
});

mongoose
  .connect(
    `mongodb+srv://${db.userName}:${db.password}@clusterprofession.sfy4j.mongodb.net/${db.databaseName}?retryWrites=true&w=majority`
  )
  .then((result) => {
    console.log(result);
    require("./db/Subjects");
    require("./db/Factors");
    app.listen(3700, () => {
      console.log("listening...");
    });
    // const server =  app.listen(3700, () => {
    //   console.log("listening...");
    // });
    // const io = initServer.init(server);
    // io.on('connection', (socket) => {
    //   console.log('client connected');
    // });
  })
  .catch((err) => {
    console.log(err);
  });
