import { Router } from 'express';
import { authCtrl } from '../controllers/auth.ctrl';
import { validateData } from '../middleware/validateData';

const router = Router();

router.post('/signin', validateData, authCtrl.signin);

export default router;