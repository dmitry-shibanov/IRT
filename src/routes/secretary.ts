import { Router } from "express";
import sessionSecretary from "../middleware/security";
import keys from "../keys/keys.json";
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
import { check, body } from "express-validator/check";

const router = Router();

// get
router.get(
  "/students/:studentId",
  sessionSecretary.bind(null, keys.secretary),
  getStudentById
);
router.get(
  "/students",
  sessionSecretary.bind(null, keys.secretary),
  getStudents
);
router.get(
  "/factors/:id",
  sessionSecretary.bind(null, keys.secretary),
  getFactorById
);
router.get(
  "/factors",
  sessionSecretary.bind(null, keys.secretary),
  getFactorsList
);
router.get(
  "/subjects/:id",
  sessionSecretary.bind(null, keys.secretary),
  getSubjectById
);
router.get(
  "/subjects",
  sessionSecretary.bind(null, keys.secretary),
  getSubjectList
);
router.get(
  "/findsuitablestudent",
  sessionSecretary.bind(null, keys.secretary),
  getInitialSuitableTable
);

// post
router.post(
  "/createuser",
  sessionSecretary.bind(null, keys.secretary),
  [
    check("email").isEmail(),
    body("password").isAlphanumeric().isLength({ min: 7 }),
  ],
  postCreateUser
);
router.post(
  "/searchresult",
  sessionSecretary.bind(null, keys.secretary),
  [check("factors").isArray()],
  postSubjectsToSearch
);

export default router;
