import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HttpRequestError from "../models/HttpRequestError";
import { randomBytes } from "crypto";

import Student from "../db/Student";

import Secrets from "../keys/keys.json";
import Secretary from "../db/Secretary";
import EmailCred from "../keys/email.json";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  //   port: 587,
  secure: false,
  auth: {
    user: EmailCred.user,
    pass: EmailCred.password,
  },
});

const generateRandomToken = () => {
  const token = randomBytes(20).toString("hex");
  return token;
};

// добавить таблицу с информацией когда token expire.
const iterateFromUsers = async (email: string) => {
  const secretary = await Secretary.findOne({
    email: email,
  });

  if (secretary) {
    return { user: secretary, role: "secretary" };
  }

  const student = await Student.findOne({
    email: email,
  });

  if (!student) {
    return null;
  }

  return { user: student, role: "student" };
};

// nT15wwBXaggzoOOn databaseUser
export const postLogin: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("login came to request handler");
  const result = validationResult(req);
  console.log(`login came validation result ${result}`);
  const error = result.array({ onlyFirstError: true })[0];
  try {
    if (!result.isEmpty()) {
      result
        .array({ onlyFirstError: true })
        .forEach((item) => console.log(item));

      throw new HttpRequestError(error.msg, 401);
    }

    const userObject = await iterateFromUsers(email);

    if (!userObject) {
      throw new HttpRequestError("Пользователь не найден", 401);
    }

    const currentUser = userObject.user;
    const role = userObject.role;

    if (!bcrypt.compare(password, currentUser?.password)) {
      throw new HttpRequestError("Пароли не совпадают", 401);
    }

    const token = jwt.sign(
      {
        email: currentUser!.email,
        userId: currentUser!.id,
      },
      Secrets.student,
      { expiresIn: "10h" }
    );

    res
      .status(200)
      .json({ token: token, userId: currentUser!.id.toString(), role: role });
  } catch (_err) {
    next(_err);
  }
};

export const postForgortPassword: RequestHandler = async (req, res, next) => {
  const email = req.body.email;

  const userId = res.locals.jwtPayLoad.userId;
  try {
    if (userId) {
      throw new HttpRequestError("Вы уже авторизованы", 422);
    }

    const user = await Student.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(403).json({
        message: "Пользователь с данным email не существует",
        error: true,
      });
    }
    const token = generateRandomToken();
    const date = new Date(Date.now() + 3600000);

    await user.update({
      resetToken: token,
      resetDate: date,
    });

    transporter.sendMail({
      to: email,
      from: "testserver",
      subject: "Forgot Password",
      html: `<h1>Востановление пароля</h1>
            <p> Пожайлуста перейдите по данной ссылке чтобы востановить пароль <a hreg="http://localhost:3700/confirm/${token}">Link</a></p>
            <p> Если вы создавали запрос на востановление пароля, то проигнорируйте данное сообщение </p>
            `,
    });
    return res.status(200).json("message was sent");
  } catch (_err) {}
};
