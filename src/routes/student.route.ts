import express from 'express';
import studentController from '../controllers/student.controller';
const router = express.Router();

router.route('/')
    .post(studentController.createStudent)
    .get(studentController.getAllStudents);

router.get('/:id', studentController.getStudentById);


export default router;