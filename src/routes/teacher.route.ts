import express from 'express';
import teacherController from '../controllers/teacher.controller';
const router = express.Router();


router.get('/names',teacherController.getTeachersName);

export default router;