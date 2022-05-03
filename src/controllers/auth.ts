import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import HttpRequestError from "../models/HttpRequestError";
import { randomBytes } from "crypto";
import { sign } from "./auth/jwt-auth";

import Student from "../db/Student";

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

interface ISkipProperties {
  [prop: string]: Number;
}

// добавить таблицу с информацией когда token expire.
const iterateFromUsers = async (
  email: string,
  skipProperties: ISkipProperties = {}
) => {
  const secretary = await Secretary.findOne({
    email: email,
  });

  if (secretary) {
    return { user: secretary, role: "secretary" };
  }

  const student = await Student.findOne(
    {
      email: email,
    },
    skipProperties
  );

  if (!student) {
    return null;
  }

  return { user: student, role: "student" };
};

// nT15wwBXaggzoOOn databaseUser
export const postLogin: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = validationResult(req);
  const error = result.array({ onlyFirstError: true })[0];

  console.log("came to login");
  console.log(email);
  console.log(password);

  try {
    if (!result.isEmpty()) {
      console.log("failed validation");
      console.log(error.msg);

      result.array().forEach((item) => {
        console.log(item.msg);
      });

      throw new HttpRequestError(error.msg, 400);
    }

    const userObject = await iterateFromUsers(email);

    if (!userObject) {
      throw new HttpRequestError("Пользователь не найден", 404);
    }

    const currentUser = userObject.user;
    const role = userObject.role;

    const passwordCompareResult = await bcrypt.compare(
      password,
      userObject.user.password
    );

    console.log(`compare result is ${passwordCompareResult}`);

    if (!passwordCompareResult) {
      throw new HttpRequestError("Пароли не совпадают", 404);
    }
    // console.log(currentUser);
    // console.log(currentUser.id);

    const token = sign({
      email: currentUser.email,
      userId: currentUser.id,
      role: role,
    });

    console.log(`toke is ${token}`);

    res
      .status(200)
      .json({ token: token, userId: currentUser.id.toString(), role: role });
  } catch (_err) {
    next(_err);
  }
};

export const postForgortPassword: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const userId = res.locals.jwtPayLoad.userId;

  try {
    if (userId) {
      throw new HttpRequestError("Вы уже авторизованы", 403);
    }

    const user = await Student.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь с данным email не существует",
        error: true,
      });
    }
    const token = generateRandomToken();
    const date = new Date(Date.now() + 3600000);

    await user
      .update([
        {
          $set: {
            resetToken: token,
            resetDate: date,
          },
        },
      ])
      .exec();

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
  } catch (_err) {
    next(_err);
  }
};
