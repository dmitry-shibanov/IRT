import { Request, Response, NextFunction } from "express";
import HttpRequestError from "../models/HttpRequestError";

import { verify } from "../controllers/auth/jwt-auth";

const sessionUser = (req: Request, res: Response, next: NextFunction) => {
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

    const decodedToken = verify(token);

    console.log(`decodedToken ${decodedToken}`);

    if (!decodedToken) {
      const err = new HttpRequestError("Ошибка при валидации токена", 500);
      throw err;
    }

    res.locals.jwtPayLoad = decodedToken;
  } catch (err) {
    return next(err);
  }
  next();
};

export default sessionUser;
