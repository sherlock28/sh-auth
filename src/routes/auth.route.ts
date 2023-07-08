import { Router } from 'express';
import { authCtrl } from '../controllers/auth.ctrl';
import { validateLoginData, validateSocialLoginData } from '../middleware';

const router = Router();

// router.post('/signup', validateRegisterData, authCtrl.signup);
router.post('/signin', validateLoginData, authCtrl.signin);
router.post('/social/signin', validateSocialLoginData, authCtrl.socialsignin);

export default router;
