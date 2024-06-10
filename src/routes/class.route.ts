import express from 'express';
import classController from '../controllers/class.controller';
const router = express.Router();

router.route('/')
    .post(classController.createClass)
    .get(classController.getClasses);


router.route('/:id')
    // .patch(classController.updateClass);
    .get(classController.getClassById)
    .delete(classController.deleteClass)


export default router;