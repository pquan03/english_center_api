import express from 'express';
import authController from '../controllers/auth.controller';
import auth from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);  
router.get('/refresh_token', authController.refreshToken);
router.get('/logout', auth, authController.logout);
export default router;