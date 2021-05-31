import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../db/Student";
import HttpRequestError from "../models/HttpRequestError";
import Secrets from "../keys/keys.json";
import Table from "../db/Table";

export const getTablesByUserId: RequestHandler = async (req, res, next) => {
  const userId = res.locals.jwtPayLoad.userId;
  try {
    const student = await Student.findById(userId);
    if (!student) {
      throw new HttpRequestError("The user does not exists", 404);
    }

    // const populatedStudent = await student
    //   .populate("table.items.tableId")
    //   .execPopulate();

    return res.status(200).json({
      tables: []//populatedStudent.table.items,
    });
  } catch (_err) {
    next(_err);
  }
  // const authHeader = req.get("Authorization");
  // const token = authHeader?.split(" ")[1];
  // const decodedToken = jwt.decode(token!);
};

export const getTableById: RequestHandler = async (req, res, next) => {
  const tableId = req.params.tableId;
  try {
    const table = await Table.findById(tableId);
    if (!table) {
      throw new HttpRequestError(
        "The specific table does not exists anymore",
        404
      );
    }

    const populatedTable = await table.populate("professions.items.professionId").execPopulate();
    return res.status(200).json({ table: populatedTable });
  } catch (_err) {
    next(_err);
  }
};

export const getChosenProfessions: RequestHandler = async (
  req,
  res,
  next
) => {};

export const postChooseProfessions: RequestHandler = async (
  req,
  res,
  next
) => {};
