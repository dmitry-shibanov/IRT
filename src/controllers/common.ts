import { RequestHandler } from "express";
import Factors from "../db/Factors";
import Student from "../db/Student";
import Subjects from "../db/Subjects";
import Table from "../db/Table";
import HttpRequestError from "../models/HttpRequestError";

export const getSubjectList: RequestHandler = async (req, res, next) => {
  try {
    const subjects = await Subjects.find();

    if (!subjects || subjects.length === 0) {
      throw new HttpRequestError("No subjects found", 404);
    }

    return res.status(200).json({ subjects: subjects });
  } catch (_err) {
    next(_err);
  }
};

export const getFactorsList: RequestHandler = async (req, res, next) => {
  try {
    const factors = await Factors.find();
    if (!factors || factors.length === 0) {
      throw new HttpRequestError("No factors found", 404);
    }

    return res.status(200).json({ factors: factors });
  } catch (_err) {
    next(_err);
  }
};

export const getFactorById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const factor = await Factors.findById(id);

    if (!factor) {
      throw new HttpRequestError("Factor was not found", 404);
    }

    return res.status(200).json({ factor: factor });
  } catch (_err) {
    next(_err);
  }
};

export const getSubjectById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const subject = await Subjects.findById(id);

    if (!subject) {
      throw new HttpRequestError("Subject was not found", 404);
    }

    return res.status(200).json({ subject: subject });
  } catch (_err) {
    next(_err);
  }
};

export const getTablesByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  const tokenUserId = res.locals.jwtPayLoad.userId;
  try {
    if (userId !== tokenUserId) {
      throw new HttpRequestError(
        "You're trying to access data, which you do not have permissions",
        403
      );
    }

    const student = await Student.findById(userId);
    if (!student) {
      throw new HttpRequestError("The user does not exists", 404);
    }

    const populatedStudent = await student
      .populate("table.items.tableId")
      .execPopulate();

    // const tables = populatedStudent.table.items.map(item => {
    //     const table = item.tableId as IUserModel;

    //     return table;
    // });

    return res.status(200).json({
      tables: [],
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
    return res.status(200).json({ table: table });
  } catch (_err) {
    next(_err);
  }
};
