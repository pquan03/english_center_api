import express from 'express';
import studentController from '../controllers/student.controller';
const router = express.Router();

router.route('/')
    .post(studentController.createStudent)
    .get(studentController.getAllStudents);

router.route('/:id')
    .get(studentController.getStudentById)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent);


export default router;