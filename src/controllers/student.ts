import { RequestHandler } from "express";
import Student from "../db/Student";
import HttpRequestError from "../models/HttpRequestError";
import Table from "../db/Table";
import { Types } from "mongoose";

export const getTablesByUserId: RequestHandler = async (req, res, next) => {
  const userId = res.locals.jwtPayLoad.userId;
  try {
    const student = await Student.findById(userId);
    if (!student) {
      throw new HttpRequestError("The user does not exists", 404);
    }

    return res.status(200).json({
      tables: [], //populatedStudent.table.items,
    });
  } catch (_err) {
    next(_err);
  }
};

export const getTableById: RequestHandler = async (req, res, next) => {
  const tableId = req.params.tableId;
  try {
    const table = Types.ObjectId.isValid(tableId)
      ? await Table.findById(tableId)
      : null;
    if (!table) {
      return res
        .status(404)
        .json({ message: "The specific table does not exists anymore" });
    }

    const populatedTable = await table.populate(
      "professions.items.professionId"
    );
    return res.status(200).json({ table: populatedTable });
  } catch (_err) {
    next(_err);
  }
};
