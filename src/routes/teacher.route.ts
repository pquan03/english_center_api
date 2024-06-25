import express from 'express';
import teacherController from '../controllers/teacher.controller';
const router = express.Router();


router.get('/names',teacherController.getTeachersName);
router.route('/')
    .post(teacherController.createTeacher)
    .get(teacherController.getTeachers);

router.route('/:id')
    .put(teacherController.updateTeacher)
    .get(teacherController.getTeacherById)
    .delete(teacherController.deleteTeacher);

export default router;