import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import HttpRequestError from "../models/HttpRequestError";
import Secrets from "../keys/keys.json";
// const Secrets = require("../keys/keys.json");

const sessionUser = (
  key: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`key is ${key}`);
  const authHeader = req.get("Authorization");
  console.log(`came to authorization ${authHeader}`);
  if (!authHeader) {
    const err = new HttpRequestError("Authorization header is missing", 401);
    // console.log(`initial check err status code is ${err._s}`);

    throw next(err);
  }
  const token = authHeader.split(" ")[1];
  const tokenCopy = <string>req.headers["auth"];
  console.log(`token ${token}`);
  console.log(`token ${tokenCopy}`);

  if (!token) {
    const err = new HttpRequestError("Not authenticated", 401);
    throw err;
  }

  let decodedToken;
  try {
    if (!key) {
      decodedToken =
        jwt.verify(token, Secrets.student) ??
        jwt.verify(token, Secrets.student);
    } else {
      decodedToken = jwt.verify(token, key);
    }

    console.log(`decodedToken ${decodedToken}`);
    res.locals.jwtPayLoad = decodedToken;
  } catch (err) {
    if (!(err instanceof HttpRequestError)) {
      // err.statusCode = 500;
    }
    console.log(`statusCode before is ${err.statusCode}`);

    return next(err);
  }
  if (!decodedToken) {
    const err = new HttpRequestError("Not authenticated", 401);
    throw err;
  }

  next();
};

export default sessionUser;
