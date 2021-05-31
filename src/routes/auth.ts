import { Router } from 'express';
import { postLogin } from '../controllers/auth';
import { check, body } from 'express-validator/check';

const router = Router();

router.post('/login', [check('email').isEmail(), body('password').isAlphanumeric().isLength({min: 7})], postLogin);

export default router;