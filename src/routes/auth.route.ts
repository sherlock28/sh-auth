import { Router } from 'express';
import { authCtrl } from '../controllers/auth.ctrl';
import { validateRegisterData, validateLoginData } from '../middleware';

const router = Router();

router.post('/signup', validateRegisterData, authCtrl.signup);
router.post('/signin', validateLoginData, authCtrl.signin);

export default router;