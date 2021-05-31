import express from "express";
import sessionUser from "../middleware/security";
import keys from "../keys/keys.json";
import { getTablesByUserId, getTableById } from '../controllers/student';
import { getSubjectList } from '../controllers/common';
import { check, body, Meta } from "express-validator/check";
import { getStudentById } from "../controllers/secretary";
import { postLogin } from "../controllers/auth";

const router = express.Router();

// get routes
router.get("/tables/:tableId", sessionUser.bind(null, keys.student), getTableById);
router.get("/tables", sessionUser.bind(null, keys.student), getTablesByUserId);
router.get("/students/:studentId", sessionUser.bind(null, keys.student), (req, res, next) => {
    const id = req.params.studentId;
    console.log(`initial id is ${id}`);
    console.log(`initial userId is ${res.locals.jwtPayLoad.userId}`);

    if(id !== res.locals.jwtPayLoad.userId) {
        next(new Error('Ids are different'));
    }
    next();
},  getStudentById);
router.get("/subjects", getSubjectList)

// post routes
router.post('/subjects', sessionUser, () => null);



export default router;
