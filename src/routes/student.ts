import express, { RequestHandler } from "express";
import sessionJWT from "../middleware/security";
import { getTablesByUserId, getTableById } from "../controllers/student";
import { getSubjectList } from "../controllers/common";
import { getStudentById } from "../controllers/secretary";

const router = express.Router();

const confirmRole: RequestHandler = (req, res, next) => {
  
  if (res.locals.jwtPayLoad.role === "student") {    
    return next();
  }

  const err = new Error("You do not have anough permissions");
  next(err);
};

// get routes
router.get("/tables/:tableId", sessionJWT, confirmRole, getTableById);
router.get("/tables", sessionJWT, confirmRole, getTablesByUserId);
router.get(
  "/students/:studentId",
  sessionJWT,
  confirmRole,
  (req, res, next) => {
    const id = req.params.studentId;
    console.log(`initial id is ${id}`);
    console.log(`initial userId is ${res.locals.jwtPayLoad.userId}`);

    if (id !== res.locals.jwtPayLoad.userId) {
      return next(new Error("Ids are different"));
    }

    console.log('came to all checks');
    
    next();
  },
  getStudentById
);
router.get("/subjects", getSubjectList);

// post routes
// router.post("/subjects", sessionJWT, () => null);

export default router;
