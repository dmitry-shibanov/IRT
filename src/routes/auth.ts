import { Request, Response, NextFunction, Router } from "express";
import { postLogin } from "../controllers/auth";
import { check, body } from "express-validator/check";
import HttpRequestError from "../models/HttpRequestError";

const router = Router();

// get requests

// post requests
router.post(
  "/login",
  [
    check("email").isEmail(),
    body("password").isAlphanumeric().isLength({ min: 7 }),
  ],
  postLogin
);
router.post(
  "/forgotPassword",
  [check("email").isEmail()],
  (req: Request, res: Response, next: NextFunction) => {
    const jwtPayLoad = res.locals.jwtPayLoad;
    if(jwtPayLoad) {
        const err = new HttpRequestError('Вы уже авторизированы', 403);
        next(err);
    }

    next();
  },
  () => null
);

export default router;