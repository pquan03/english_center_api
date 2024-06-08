import express from 'express';
import classController from '../controllers/class.controller';
const router = express.Router();


router.get('/', classController.getClasses);

router.get('/:id', classController.getClassById);

export default router;