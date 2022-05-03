import { Router } from "express";
import sessionJWT from "../middleware/security";
import { RequestHandler } from "express";

import {
  getFactorById,
  getFactorsList,
  getSubjectById,
  getSubjectList,
} from "../controllers/common";
import {
  getStudentById,
  getStudents,
  postCreateUser,
  getInitialSuitableTable,
  postSubjectsToSearch,
} from "../controllers/secretary";
import { check, body } from "express-validator";

const router = Router();

const confirmRole: RequestHandler = (req, res, next) => {
  console.log(`res.locals.payLoad is ${res.locals.jwtPayLoad}`);

  if (res.locals.jwtPayLoad.role === "secretary") {
    console.log(`res.locals.jwtPayLoad.role is ${res.locals.jwtPayLoad.role}`);

    return next();
  }

  const err = new Error("You do not have anough permissions");
  next(err);
};

// get
router.get("/students/:studentId", sessionJWT, confirmRole, getStudentById);
router.get("/students", sessionJWT, confirmRole, getStudents);
router.get("/factors/:id", sessionJWT, confirmRole, getFactorById);
router.get("/factors", sessionJWT, confirmRole, getFactorsList);
router.get("/subjects/:id", sessionJWT, confirmRole, getSubjectById);
router.get("/subjects", sessionJWT, confirmRole, getSubjectList);
router.get(
  "/findsuitablestudent",
  sessionJWT,
  confirmRole,
  getInitialSuitableTable
);

// post
router.post(
  "/createuser",
  sessionJWT,
  confirmRole,
  [
    check("email").isEmail(),
    body("password").isAlphanumeric().isLength({ min: 7 }),
  ],
  postCreateUser
);
router.post(
  "/searchresult",
  sessionJWT,
  confirmRole,
  [check("factors").isArray()],
  postSubjectsToSearch
);

export default router;
