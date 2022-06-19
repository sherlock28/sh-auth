import { Router } from 'express';
import { userController } from '../controllers/auth.ctrl';
import { validateData } from '../middleware/validateData';

const router = Router();

router.post('/signin', validateData, userController.signin);

export default router;