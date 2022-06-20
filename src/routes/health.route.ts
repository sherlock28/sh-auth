import { healthCheckCtrl } from '../controllers/healthCheck.ctrl';
import { Router } from 'express';

const router = Router();

router.get("/health", healthCheckCtrl.healthCheck);

export default router;