import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import HttpRequestError from "../models/HttpRequestError";
import Secrets from "../keys/keys.json";

const sessionUser = (
  key: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`key is ${key}`);
  const authHeader = req.get("Authorization");
  console.log(`came to authorization ${authHeader}`);
  try {
    if (!authHeader) {
      const err = new HttpRequestError("Authorization header is missing", 401);
      throw err;
    }
    const token = authHeader.split(" ")[1];
    const tokenCopy = <string>req.headers["auth"];
    console.log(`token ${token}`);
    console.log(`token ${tokenCopy}`);

    if (!token) {
      throw new HttpRequestError("Токен не передан или пустой", 401);
    }

    let decodedToken;

    if (!key) {
      decodedToken =
        jwt.verify(token, Secrets.student) ??
        jwt.verify(token, Secrets.student);
    } else {
      decodedToken = jwt.verify(token, key);
    }

    console.log(`decodedToken ${decodedToken}`);

    if (!decodedToken) {
      const err = new HttpRequestError("Ошибка при создании токена", 500);
      throw err;
    }

    res.locals.jwtPayLoad = decodedToken;
  } catch (err) {
    return next(err);
  }
  next();
};

export default sessionUser;
