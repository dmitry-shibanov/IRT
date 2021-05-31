import { Router } from 'express';
import sessionSecretary from '../middleware/security';
import keys from '../keys/keys.json';
import { getFactorById, getFactorsList, getSubjectById, getSubjectList } from '../controllers/common';
import { getStudentById, getStudents, postCreateUser } from '../controllers/secretary';
import { check, body } from 'express-validator/check';
import { postLogin } from '../controllers/auth';


const router = Router();

// get
router.get('/students/:studentId', sessionSecretary.bind(null, keys.secretary), getStudentById);
router.get('/students', getStudents); // sessionSecretary.bind(null, keys.secretary), 
router.get('/factors/:id', sessionSecretary.bind(null, keys.secretary), getFactorById)
router.get('/factors', sessionSecretary.bind(null, keys.secretary), getFactorsList)
router.get('/subjects/:id', sessionSecretary.bind(null, keys.secretary), getSubjectById)
router.get('/subjects', sessionSecretary.bind(null, keys.secretary), getSubjectList)

// post
router.post('/createuser', sessionSecretary.bind(null, keys.secretary), postCreateUser);
// router.post('/login', [check('email').isEmail(), body('password').isAlphanumeric().isLength({min: 7})], postLogin);

export default router;