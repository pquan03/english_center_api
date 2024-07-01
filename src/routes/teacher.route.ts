import express from 'express';
import teacherController from '../controllers/teacher.controller';
const router = express.Router();


router.get('/names',teacherController.getTeachersName);
router.route('/')
    .post(teacherController.createTeacher)
    .get(teacherController.getTeachers);

router.route('/:id')
    .patch(teacherController.updateTeacher)
    .get(teacherController.getTeacherById)
    .delete(teacherController.deleteTeacher);

router.get('/classes/:id',teacherController.getClassByTeacher);


router.get('/')

export default router;